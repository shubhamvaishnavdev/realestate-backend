import { PROPERTY_RESPONSE_MESSAGES } from "../../constant/propertyResponseMessages.js";
import { STATUS_CODES } from "../../constant/statusCodes.js";
import Property from "../../models/property.model.js";
import {
  sendErrorResponse,
  sendSuccessResponseWithPagination,
} from "../../utils/response.js";

export const fetchPropertyList = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 9,
      type,
      price,
      area,
      rooms,
      transaction_type,
      lat = null,
      lon = null,
    } = req.query;

    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 9;
    const skip = (pageNum - 1) * pageSize;

    const query = {};
    const radius = 5;
    // Geospatial Search
    if (lat && lon) {
      query.location = {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(lon), parseFloat(lat)],
            radius / 6371, // Convert km to radians (Earth's radius = 6371  km)
          ],
        },
      };
    }

    // Transaction Type (buy/rent)
    if (transaction_type) {
      query.transaction_type = transaction_type;
    }

    // Property Type (apartment, house, villa)
    if (type) {
      query.type = type;
    }

    //  Price Range Filter
    if (price) {
      if (price === "under-100k") query.property_price = { $lt: 100000 };
      if (price === "100k-500k")
        query.property_price = { $gte: 100000, $lte: 500000 };
      if (price === "above-500k") query.property_price = { $gt: 500000 };
    }

    // Property Area Filter
    if (area) {
      if (area === "under-50") query.property_area = { $lt: 50 };
      if (area === "50-100") query.property_area = { $gte: 50, $lte: 100 };
      if (area === "above-100") query.property_area = { $gt: 100 };
    }

    //  Rooms Filter
    if (rooms) {
      if (rooms === "3+") query.rooms = { $gte: 3 };
      else query.rooms = parseInt(rooms);
    }

    // Fetch properties with filters, sorting by newest
    const properties = await Property.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    // Count total matching properties
    const total = await Property.countDocuments(query);

    // Pagination Info
    const pagination = {
      currentPage: pageNum,
      totalPages: Math.ceil(total / pageSize),
      totalItems: total,
    };

    return sendSuccessResponseWithPagination(
      res,
      STATUS_CODES.SUCCESS,
      properties,
      PROPERTY_RESPONSE_MESSAGES.PROPERTY_FETCH_SUCCESS,
      pagination
    );
  } catch (error) {
    return sendErrorResponse(
      res,
      STATUS_CODES.SERVER_ERROR,
      error?.message || error,
      PROPERTY_RESPONSE_MESSAGES.PROPERTY_FETCH_FAIL
    );
  }
};

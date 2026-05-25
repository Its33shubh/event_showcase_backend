import Event from "../models/Event.js";
import cloudinary, { getPublicIdFromUrl } from "../config/cloudinary.js";

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      status,
      startDate,
      endDate,
      ...otherFields
    } = req.body;

    if (!title || !description || !category || !status) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Required fields missing"
      });
    }

    let eventDate = null;

    if (startDate && endDate) {
      eventDate = `${startDate} to ${endDate}`;
    } else if (startDate) {
      eventDate = startDate;
    } else if (endDate) {
      eventDate = endDate;
    }

    const imageUrl = req.file ? req.file.path : "";

    const event = await Event.create({
      title,
      description,
      category,
      status,
      date: eventDate,
      image: imageUrl,
      ...otherFields
    });

    return res.status(201).json({
      error: false,
      success: true,
      message: "Event created successfully",
      data: event
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const { category, status, search } = req.query;

    let query = {};

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const events = await Event.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      error: false,
      success: true,
      message: events.length > 0
        ? "Events fetched successfully"
        : "No events found",
      data: events
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message
    });
  }
};


export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "Event not found"
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      message: "Event fetched successfully",
      data: event
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, ...otherFields } = req.body;

    const existingEvent = await Event.findById(id);

    if (!existingEvent) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "Event not found"
      });
    }

    let updateData = { ...otherFields };

    if (startDate && endDate) {
      updateData.date = `${startDate} to ${endDate}`;
    } else if (startDate) {
      updateData.date = startDate;
    } else if (endDate) {
      updateData.date = endDate;
    }

    if (req.file) {
      if (existingEvent.image) {
        const publicId = getPublicIdFromUrl(existingEvent.image);

        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }

      updateData.image = req.file.path;
    }

    const event = await Event.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    return res.status(200).json({
      error: false,
      success: true,
      message: "Event updated successfully",
      data: event
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message
    });
  }
};


export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "Event not found"
      });
    }

    if (event.image) {
      const publicId = getPublicIdFromUrl(event.image);

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await Event.findByIdAndDelete(id);

    return res.status(200).json({
      error: false,
      success: true,
      message: "Event deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message
    });
  }
};
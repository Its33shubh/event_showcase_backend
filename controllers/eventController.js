import Event from "../models/Event.js";

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

    // Required field check
    if (!title || !description || !category || !status) {
      return res.status(400).json({
        error:true,
        success: false,
        message: "Required fields missing"
        
      });
    }

    // Date logic
    let eventDate = null;

    if (startDate && endDate) {
      eventDate = `${startDate} to ${endDate}`;
    } else if (startDate) {
      eventDate = startDate;
    } else if (endDate) {
      eventDate = endDate;
    }

    const event = await Event.create({
      title,
      description,
      category,
      status,
      date: eventDate,
      ...otherFields
    });

    return res.status(201).json({
      error: false,
      success: true,
      message: "Event created successfully",
      data : event
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

    // category filter
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    // status filter
    if (status) {
      query.status = status;
    }

    // title search
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const events = await Event.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      error: false,
      success: true,
      message: events.length
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
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({
    message: "Event updated",
    event
  });
};

export const deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);

  res.json({ message: "Event deleted" });
};
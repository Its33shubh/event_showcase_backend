<div align="center">

# 📅 Event Showcase API
### Documentation for Event Management System

---

*A centralized API for managing events, providing administrative control and public event discovery.*

</div>

## 🌐 Base URL
`http://localhost:5000/api`

---

## 🔐 Authentication & Security

| Type | Access |
| :--- | :--- |
| **Admin** | Protected (Bearer Token) |
| **User** | Public/Authenticated |

*All private routes require the header:* `Authorization: Bearer <JWT_TOKEN>`

---

## 📋 API Endpoints

### 👔 Admin Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/admin/register` | Register new administrator |
| `POST` | `/admin/login` | Admin login |
| `GET` | `/admin/profile` | Fetch admin profile |
| `GET` | `/admin/dashboard-stats` | Get event statistics |

### 🎫 Event Operations
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/events/create` | Create new event (Admin only) |
| `GET` | `/events/get` | Get all events (supports filtering) |
| `GET` | `/events/get/:id` | Get single event details |
| `PUT` | `/events/update/:id` | Update event (Admin only) |
| `DELETE` | `/events/delete/:id` | Delete event (Admin only) |

### 👤 User Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | User login |

---

## ⚙️ Request & Response Notes
* **Content Type**: Use `multipart/form-data` for creating and updating events to handle file uploads [cite: 4].
* **Query Parameters**: The `/events/get` endpoint supports `category`, `status`, and `search` filters [cite: 4].

---

## 🚨 Error Codes
* **401 Unauthorized**: Missing or invalid token [cite: 4].
* **403 Admin Only**: Action restricted to administrators [cite: 4].
* **404 Not Found**: Specified resource does not exist [cite: 4].
* **500 Internal Server Error**: General server failure [cite: 4].

---
<div align="center">
Event Showcase API &copy; 2026
</div>

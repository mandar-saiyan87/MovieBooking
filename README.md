## Hotel Booking Next.js 13

## Technologies Used

- Next.js for the frontend.
- Flask for the backend.
- MongoDB Atlas as the database.
- JWT authentication for user authentication.

## Deployment Information

- The app is currently deployed on [Render.com](https://airbnc-hotelbooking.onrender.com).
- Live link: [AirBnC Hotel Booking](https://airbnc-hotelbooking.onrender.com).

## Known Issues and Limitations

- Image reading problems during accommodation creation. Suggest using image links instead of local device images.
- Can test image uploading from device on Local Machine setup for now.(Trying to understand and resolve the issue with deployment onRender.com)
- Delays expected due to a free account on Render.com with limited resources.

## Local Setup

### Backend Setup

1. Create a virtual environment.
2. Install packages from `requirements.txt`.
3. Configure MongoDB Atlas with a new cluster and database (e.g., airbncDB).
4. Set up environment variables (SECRET_KEY, JWT_SECRET_KEY, MONGO_PASSWORD).
5. Create collections in the database (users, places, bookings).
6. Run the backend server using `python app.py`.


### Frontend Setup

1. Install packages from `package.json`.
2. Create a `.env` file with the backend server's URL or IP (NEXT_PUBLIC_API_SRV).
3. Run the frontend using `npm run dev`.

## GitHub Repository

- Users can download the repository, which contains frontend and backend folders.

## Additional Notes

- Emphasize the need to use image links during accommodation creation on the Render deployment.
- Inform users about possible delays on the website due to the free account on Render.com.

## Future Development

- The UI and functionality may change in the future as new ideas are implemented.

##
-Email Me for queries: mdman2257@gmail.com

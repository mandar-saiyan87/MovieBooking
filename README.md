## Airbnc Holiday Booking Next.js 13
Welcome to the AirBnC Hotel Booking App! This is a basic hotel booking application built using Next.js, Flask, MongoDB Atlas, and JWT authentication. The project is deployed on Render.com, and you can access the live version [here](https://airbnc-holidays.vercel.app).

## Technologies Used

- Next.js for the frontend.
- Flask for the backend.
- MongoDB Atlas as the database.
- JWT authentication for user authentication.

## Deployment Information

- The app is currently deployed on [vercel.com](https://airbnc-holidays.vercel.app/).
- Live link: [AirBnC Hotel Booking](https://airbnc-holidays.vercel.app/).


## Features

- **User Registration and Login:** Users can create a new account and log in to the system securely using JWT authentication.

- **Accommodation Management:**
  - Create New Accommodation: Users can add new places with details such as name, description, images (using image links due to deployment constraints), and other relevant information.
  - Edit and Delete Accommodation: Users have the ability to modify existing accommodations or remove them from the platform.

- **Accommodation Selection:**
  - Users can select a main image for each accommodation from a list of images.
  - Bookings: Users can make bookings for specific accommodations.


## Known Issues and Limitations

- Image rendering problems for saved images (uploaded from device) during accommodation creation (Vercel doesn't allow storage usage e.g redis etc. for free plans). Suggesting using image links instead of local device images.
- Tried to store images in database using GridFS but it takes too much time and resources causes delays so dropped the idea.
- Can test image uploading from device on Local Machine setup for now.
- Delays expected due to a free account on vercel.com with limited resources.


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
2. Create a `.env` file with the backend server's URL or IP (NEXT_PUBLIC_API_SRV). If want to test only frontend you can use already hosted backend. Put backend server's url (https://hotelbooking-backend.vercel.app) and you are good to go.
4. Run the frontend using `npm run dev`.


## GitHub Repository

- Users can download the repository, which contains frontend and backend folders.

## Additional Notes

- Emphasize the need to use image links during accommodation creation on the Render deployment.
- Inform users about possible delays on the website due to the free hosting account.

## Future Development

- The UI and functionality may change in the future as new ideas are implemented.

##
-Email Me for queries: mdman2257@gmail.com

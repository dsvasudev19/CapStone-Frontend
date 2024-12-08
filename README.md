# SmartTransit

**SmartTransit** is a cutting-edge Angular-based web application designed to provide live bus location tracking, carpool services, and smooth payment processing for daily commuters. It leverages the Ola Maps SDK for live location tracking and integrates the Razorpay Payment Gateway for secure and seamless transactions. The project is structured in a modular manner, making it scalable, maintainable, and easy to extend.

## Features

- **Live Bus Location Tracking**: Track buses in real-time with the integration of Ola Maps SDK.
- **Carpool Services**: Book carpool rides for daily commutes, helping reduce traffic and save costs.
- **Razorpay Payment Gateway**: Easily pay for bus rides or carpool services with integrated Razorpay payment gateway.
- **User Profile**: Personalized user profiles to manage bookings, payment details, and settings.
- **Modular Project Structure**: A scalable and organized Angular project with reusable modules for ease of development.

## Technologies Used

- **Angular**: Frontend framework for building the web application.
- **Ola Maps SDK**: For live bus tracking and map services.
- **Razorpay**: Payment gateway for handling payments.
- **Bootstrap**: For responsive and modern UI design.
- **Node.js**: Backend server for handling API requests (if applicable).

## Project Structure

The project follows a modular structure, with different components for buses, carpool services, user profile, and payments.

```
src/
  ├── app/
      ├── userapp/
      ├── dashboard/
      ├── guards/
      ├── layouts/
      ├── spinners/
      ├── app.module.ts
      └── app.component.ts
  ├── assets/
      └── images/
  └── environments/
```

- **bus-tracking**: Handles all the logic for bus live location tracking and displays it on the map.
- **carpool-services**: Contains all the carpool services functionality, such as booking, listing, and payment.
- **user-profile**: Manages the user profile, including user information and ride history.

  
## Setup

To run the SmartTransit project locally:

### Prerequisites
- Node.js installed (v14.x or higher).
- Angular CLI installed globally (`npm install -g @angular/cli`).
- Razorpay API keys (for integrating payment services).
- Ola Maps SDK API key (for live location tracking).

### Steps to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/dsvasudev19/CapStone-Frontend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add your Razorpay API keys and Ola Maps SDK key to the environment files:
   - `src/environments/environment.ts` (for development)
   - `src/environments/environment.prod.ts` (for production)

4. Run the application locally:

   ```bash
   ng serve
   ```

5. Open your browser and go to `http://localhost:4200` to see the app in action.

## Screenshots

### Home Page
![Home Page](https://res.cloudinary.com/dxqrg09mq/image/upload/v1733644846/screencapture-localhost-4200-2024-12-08-12_59_49_ao3wpx.png)

### Bus Listing
![Bus Listing](https://res.cloudinary.com/dxqrg09mq/image/upload/v1733644823/screencapture-localhost-4200-bus-search-2024-12-08-13_09_25_tsntmp.png)

### CarPool Services Listing
![Carpool Services](https://res.cloudinary.com/dxqrg09mq/image/upload/v1733644825/screencapture-localhost-4200-carpool-2024-12-08-13_09_43_p1ldah.png)

### UserProfile Page
![UserProfile](https://res.cloudinary.com/dxqrg09mq/image/upload/v1733644800/screencapture-localhost-4200-user-profile-2024-12-08-13_10_17_deevcq.png)

### Bus Schedules Page
![Bus Schedules](https://res.cloudinary.com/dxqrg09mq/image/upload/v1733644790/screencapture-localhost-4200-bus-schedules-2024-12-08-13_09_57_jf2fhd.png)

## Contributing

We welcome contributions! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to your forked repository (`git push origin feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Ola Maps SDK for providing the live location tracking service.
- Razorpay for providing an easy-to-integrate payment gateway.
- Bootstrap for fast and responsive UI development.

---

Feel free to reach out for any queries or contributions to the **SmartTransit** project!

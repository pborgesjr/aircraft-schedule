# Aircraft Scheduler

## Demo

https://airport-scheduler.netlify.app/

## Technologies Used

- **React**
- **TypeScript**
- **Jest**
- **Testing Library**
- **Tailwind CSS**
- **TanStack Query**

## Installation

1. Clone the repository:

2. Install dependencies:
   ```sh
   npm install
   ```

## Usage

To start the development server:

```sh
npm run dev
```

To run tests:

```sh
npm test
```

## TODO

- Add animations to components and Home Page
- Add skeletons/loading/shimmer
- Add tests to remaining files
- Integrate a router if more screens are added
- Improve responsiveness to support mobile devices
- Add onSubmit handler to send data for each aircraft
- Add calendar functionality

## Notes

- The purpose of the base prop was unclear, so I chose not to use it.
- I opted for TanStack Query's Server State instead of local state or a global state management libraries to handle filtered data. This approach reduces unnecessary state management complexity, improves performance, and ensures a single source of truth for API-fetched data through selector functions.
- The user can replace a flight in the rotation by selecting the flight from the rotation and replacing it with the desired flight from the available flights list.
- Removing a flight from rotation is allowed when the flight is the first or the last in the rotation.
- The user can manage all aircraft's rotation.
- It was not specified whether a flight assigned to one aircraft can also be assigned to another.

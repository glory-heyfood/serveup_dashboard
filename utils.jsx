import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import ShortUniqueId from "short-unique-id";
export const toastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
// Function for hanling the API calls
export const handleAPI = async (promise) => {
  try {
    const response = await promise;
    if (response.data.message !== "") {
      toast.success(response.data.message, toastOptions);
    }
    return response;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message, toastOptions);
    } else {
      toast.error(error.message, toastOptions);
    }
  }
};

export const isPasswordStrong = (password) => {
  if (password.length < 8) {
    return false;
  } else {
    return true;
  }
};

// this functions return the number of strings u want
// exmple string = glory , if u do getStringCharacter(0,3) you will get glo
export const getSubstring = (start, end, string) => {
  return string?.slice(start, end);
};

export const searchArrayforEmployeeAndCustomer = (dataArray, searchInput) => {
  const filteredArray = dataArray.filter(
    (item) =>
      `${item.first_name} ${item.last_name}`
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.phone_number.toLowerCase().includes(searchInput.toLowerCase())
  );
  return filteredArray;
};

export const searchArrayForStores = (dataArray, searchInput) => {
  const filteredArray = dataArray.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return filteredArray;
};

export const checkItemStock = (data) => {
  let message = "";
  if (data?.message === "Indefinitely") {
    message = "Out of stock";
    return message;
  }

  const referenceDate = new Date(data?.reference_date);
  const currentDate = new Date();

  // Compare the two dates
  if (referenceDate > currentDate) {
    message = data?.message;
  } else {
    message = "In stock";
  }

  return message;
};

export const checkIsStoreOpen = (data) => {
  console.log(data);
  if (data?.status === true) {
    return true;
  }
  if (data?.message === "Your store is closed indefinitely") {
    return false;
  }
  const currentDate = new Date();
  const referenceDate = new Date(data?.referenceDate);
  if (referenceDate > currentDate) {
    return false;
  } else {
    return true;
  }
};

export const convertStoreTimeTo24Hour = (time12h) => {
  const trimmedTime = time12h.trim();
  const [time, modifier] = trimmedTime.split(" ");

  let [hours, minutes] = time.split(":");
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }

  if (hours === "12" && modifier === "AM") {
    hours = "00";
  }

  if (hours === "12" && modifier === "PM") {
    hours = "12";
  }

  if (modifier === "PM" && hours !== "12") {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  return `${hours}:${minutes}`;
};

export const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const isAM = hours < 12;
  const amOrPm = isAM ? "AM" : "PM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${formattedHours}:${minutes} ${amOrPm}`;
};

const getNextOpeningTime = (businessHours) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const reorderedBusinessHours = {};
  daysOfWeek.forEach((day) => {
    reorderedBusinessHours[day] = businessHours[day];
  });
  const days = Object.keys(reorderedBusinessHours);
  let day = new Date().getDay();
  if (day === 0) {
    day = 7;
  }
  const currentDay = days[day - 1]; // Get the current day (0 = Sunday, 1 = Monday, etc.)
  // Find the next open day
  let nextOpenDay = currentDay;
  let nextOpenTime = "";
  let found = false;
  for (let i = 1; i <= 7; i++) {
    const nextDay = days[(days.indexOf(currentDay) + i) % 7];
    if (businessHours[nextDay].workingDays) {
      nextOpenDay = nextDay;
      nextOpenTime = businessHours[nextDay].open;
      found = true;
      break;
    }
  }

  // If the store is closed for the next 7 days, return a message
  if (!found) {
    return "The store is closed for the next 7 days.";
  }

  const [time, modifier] = nextOpenTime.split(" ");

  let [hours, minutes] = time.split(":");
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }

  if (hours === "0") {
    hours = `12`;
  }

  return `Sorry we are currently closed . Opens at ${hours}:${minutes} ${modifier} on . ${nextOpenDay}`;
};

function isTimeEarlier(time1, time2) {
  const [hours1, minutes1] = time1.split(":").map(Number);
  const [hours2, minutes2] = time2.split(":").map(Number);
  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;

  return totalMinutes1 < totalMinutes2;
}

export const checkStoreStatus = (business_hours, isOpen) => {
  if (isOpen?.message === "Your store is closed indefinitely") {
    return {
      status: false,
      message: "Sorry, we are closed till further notice",
    };
  }

  if (isOpen?.message === "Your store is closed for the day") {
    return {
      status: false,
      message: `The store is closed for the day`,
    };
  }
  const currentDate = new Date();
  const referenceDate = new Date(isOpen?.referenceDate);
  if (referenceDate > currentDate) {
    // const diffInMs = referenceDate.getTime() - currentDate.getTime();
    // const diffHours = Math.floor(diffInMs / (1000 * 60 * 60));
    // const diffMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

    // let diffMessage = "";
    // if (diffHours > 0 && diffMinutes > 0) {
    // 	diffMessage = `${diffHours} hours and ${diffMinutes} minutes`;
    // } else if (diffHours > 0) {
    // 	diffMessage = `${diffHours} hours`;
    // } else if (diffMinutes > 0) {
    // 	diffMessage = `${diffMinutes} minutes`;
    // } else {
    // 	diffMessage = "less than a minute";
    // }

    const time = referenceDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return {
      status: false,
      message: `Sorry we are currently closed . Opens in ${time}.`,
    };
  }

  const now = new Date();
  const currentDay = now.toLocaleString("en-US", { weekday: "long" });
  const currentTime = getCurrentTime();

  const { open, close, workingDays } = business_hours[currentDay];

  if (!workingDays) {
    const message = getNextOpeningTime(business_hours);
    return {
      status: false,
      message: `${message}`,
    };
  }

  const openTime24h = convertStoreTimeTo24Hour(open);
  const closeTime24h = convertStoreTimeTo24Hour(close);
  const currentTime24h = convertStoreTimeTo24Hour(currentTime);

  const result = isTimeEarlier(currentTime24h, openTime24h);

  if (result) {
    // const time = getTimeDifference(currentTime24h, openTime24h);
    const [time, modifier] = open.split(" ");

    let [hours, minutes] = time.split(":");
    if (minutes.length === 1) {
      minutes = `0${minutes}`;
    }

    return {
      status: false,
      message: ` Sorry we are currently close . Opens at ${hours}:${minutes} ${modifier}`,
    };
  }

  const closeResult = isTimeEarlier(currentTime24h, closeTime24h);

  if (!closeResult) {
    const message = getNextOpeningTime(business_hours);
    return {
      status: false,
      message: `${message}`,
    };
  }

  return {
    status: true,
    message: "The store is currently open.",
  };
};

export const getTimeFromDate = (dateString) => {
  const date = new Date(dateString);

  // Get hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours > 12 ? hours - 12 : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Determine AM/PM
  const period = hours >= 12 ? "PM" : "AM";

  // Construct the formatted time string
  const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

  return formattedTime;
};

export const setItemWithEvent = (key, value) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, value);
    // Dispatch a custom event after setting the item
    const storageEvent = new Event(key);
    window.dispatchEvent(storageEvent);
  }
};

// Function to listen for changes in localStorage
export const listenForStorageChanges = (handleChange, key) => {
  if (typeof window !== "undefined") {
    window.addEventListener(key, () => {
      console.log("localStorage changed");
      // Handle the localStorage change here
      handleChange();
    });
  }
};

export function convertTo24Hour(timeString) {
  const time = dayjs(timeString, "h:mm A");
  const hour = time.format("H");
  const minute = time.format("m");
  return { hour: parseInt(hour), minute: parseInt(minute) };
}

export const generateId = () => nanoid();

const uid = new ShortUniqueId({ length: 5 });

export const generateShortId = (uppercase) => {
  if (uppercase) {
    return uid.rnd().toUpperCase();
  } else {
    return uid.rnd();
  }
};

export const getMenu = () => {
  const menu_id = JSON.parse(
    window.localStorage.getItem("serveup_store")
  )?.menu_id;

  return menu_id;
};

export const getStore = () => {
  const store = JSON.parse(window.localStorage.getItem("serveup_store"));
  return store;
};

export const getBusiness = () => {
  const store = JSON.parse(window.localStorage.getItem("serveup_business"));
  return store;
};

export const getRecurringApis = async (promise, duration) => {
  console.log("hey");
};

export function getTimeAgo(timestamp) {
  const date = new Date(timestamp); // Parse the ISO 8601 timestamp
  const now = new Date(); // Current time

  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
}

export function getOrderTime(dateString) {
  // Example: Given date
  if (dateString === null || dateString === undefined) {
    return "";
  }
  const givenDate = new Date(dateString); // Replace with your own date

  // Get current date
  const currentDate = new Date();

  // Calculate difference in milliseconds
  const differenceMs = givenDate - currentDate;

  if (givenDate > currentDate) {
    // Function to format the difference as a string
    function formatTimeDifference(differenceMs) {
      // Convert milliseconds to positive integer
      const differenceSeconds = Math.abs(differenceMs) / 1000;

      // Calculate days, hours, minutes, seconds
      let days = Math.floor(differenceSeconds / (3600 * 24));
      let hours = Math.floor((differenceSeconds % (3600 * 24)) / 3600);
      let minutes = Math.floor((differenceSeconds % 3600) / 60);
      let seconds = Math.floor(differenceSeconds % 60);

      // Calculate years and months based on calendar approximation (ignores leap years, etc.)
      const yearDiff = Math.floor(days / 365);
      const monthDiff = Math.floor((days % 365) / 30); // Approximate, assuming 30 days per month

      // Build the formatted string
      const parts = [];
      if (yearDiff > 0) {
        parts.push(`${yearDiff} year${yearDiff !== 1 ? "s" : ""}`);
      }
      if (monthDiff > 0) {
        parts.push(`${monthDiff} month${monthDiff !== 1 ? "s" : ""}`);
      }
      if (days > 0) {
        parts.push(`${days} day${days !== 1 ? "s" : ""}`);
      }
      if (hours > 0) {
        parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
      }
      if (minutes > 0) {
        parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
      }
      if (seconds > 0) {
        parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);
      }

      // Return the formatted string
      return parts.join(", ");
    }

    // Format the difference between givenDate and currentDate
    const formattedDifference = formatTimeDifference(differenceMs);
    return formattedDifference;
  } else {
    return getTimeAgo(givenDate);
  }
}

export const formatMoney = (amount) => {
  let formatter = new Intl.NumberFormat("en-US", { currency: "ngn" });

  return formatter.format(amount);
};

export const getDateAndTime = (dateString) => {
  // Create a Date object from the input dateString
  const date = new Date(dateString);

  // Array of month names for formatting
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get day, month, year, hours, and minutes
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" }); // Short day name (e.g., Wed)
  const month = monthNames[date.getMonth()]; // Short month name (e.g., Oct)
  const day = date.getDate(); // Day of the month (e.g., 4)
  const year = date.getFullYear(); // Full year (e.g., 2024)
  const hours = date.getHours(); // Hours (e.g., 10)
  const minutes = date.getMinutes(); // Minutes (e.g., 0)

  // Format the time into AM/PM format
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Construct the formatted date string
  const formattedDate = `${dayOfWeek} ${month} ${day}, ${year} . ${formattedHours}:${formattedMinutes} ${period}`;

  return formattedDate;
};

export const combineDateAndTime = (date, time, init) => {
  // Function to extract date components
  function extractDateComponents(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" }); // Short month name like "Jun"
    const day = date.getDate();
    return { year, month, day };
  }

  // Function to extract time components
  function extractTimeComponents(timeString) {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    console.log(hours, minutes, seconds);
    return { hours, minutes, seconds };
  }

  // Extract components from each date string
  const date1Components = extractDateComponents(date);
  const date2Components = extractTimeComponents(time);

  // Combine date and time components into a new Date object

  function monthNameToIndex(monthName) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.indexOf(monthName);
  }

  const combinedDate = new Date(
    date1Components.year,
    monthNameToIndex(date1Components.month),
    date1Components.day,
    date2Components.hours,
    date2Components.minutes,
    date2Components.seconds
  );
  console.log(combinedDate);

  return combinedDate;
};

export const getDateFromDateString = (dateString) => {
  const date = new Date(dateString);

  // Get day, month, and year
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();

  // Construct the formatted date string
  const formattedDate = `${dayOfWeek} ${month}, ${year}`;

  return formattedDate;
};

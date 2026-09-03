export const siteUrl = "https://jumbos-hamburgers-tulsa.contact479101.chatgpt.site";

export const restaurant = {
  name: "Jumbo's Hamburgers",
  shortName: "Jumbo's",
  address: "6558 E 41st St",
  city: "Tulsa",
  region: "OK",
  postalCode: "74145",
  phoneDisplay: "(918) 663-0944",
  phoneHref: "tel:+19186630944",
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=Jumbo%27s%20Hamburgers%2C%206558%20E%2041st%20St%2C%20Tulsa%2C%20OK%2074145",
  facebookHref: "https://www.facebook.com/Jumbo-Hamburgers-104943082882689/",
  hoursNote: "Hours vary by public source. Please call before visiting.",
  orderHref: null as string | null,
};

const boardNote = "Current in-store board, photographed September 2025";

export const menuSections = [
  {
    slug: "burgers",
    name: "Burgers",
    note: boardNote,
    items: [
      ["Hamburger", "$5.99"], ["Cheese", "$6.99"], ["Double", "$8.99"],
      ["Double cheese", "$9.99"], ["Bacon", "$9.99"], ["Sausage", "$9.99"],
      ["Mushroom", "$9.99"], ["Chili", "$9.99"], ["Egg", "$9.99"],
      ["Avocado", "$9.99"], ["Gyro burger", "$9.99"], ["Chicago", "$14.99"],
    ],
  },
  {
    slug: "meals",
    name: "Combo meals",
    note: `Burger meals include fries & a drink; gyro meals include a drink. ${boardNote}`,
    items: [
      ["Hamburger meal", "$10.99"], ["Cheese burger meal", "$11.99"], ["Double cheese meal", "$14.99"],
      ["Bacon cheese meal", "$14.99"], ["Sausage cheese meal", "$14.99"], ["Gyro burger meal", "$14.99"],
      ["Chicago burger meal", "$16.99"], ["Gyro + fries", "$13.99"], ["Gyro + salad", "$14.99"],
      ["Gyro + tabouli & hummus", "$15.99"], ["Rice platter (gyro or grilled chicken)", "$16.99"],
    ],
  },
  {
    slug: "gyros",
    name: "Gyros & wraps",
    note: boardNote,
    items: [
      ["Gyro wrap", "$9.99"], ["Chicken gyro", "$9.99"], ["Falafel wrap", "$9.99"],
    ],
  },
  {
    slug: "salads",
    name: "Salads",
    note: boardNote,
    items: [
      ["Green salad", "$11.99"], ["Chicken salad", "$13.99"], ["Gyro salad", "$13.99"],
      ["Chef salad", "$13.99"], ["Taco salad", "$13.99"], ["Tuna salad", "$13.99"],
      ["Greek salad", "$13.99"], ["Avocado salad", "$13.99"],
    ],
  },
  {
    slug: "subs",
    name: "Subs",
    note: boardNote,
    items: [
      ["Chicken sub", "$10.99"], ["Philly steak", "$10.99"], ["Super sub", "$10.99"],
      ["3 cheese & avocado", "$10.99"], ["Tuna sub", "$9.99"], ["Turkey sub", "$9.99"],
    ],
  },
  {
    slug: "sides",
    name: "Sides & sweets",
    note: boardNote,
    items: [
      ["French fries", "$2.99"], ["Tater tots", "$3.99"], ["Fried mushrooms", "$5.99"],
      ["Onion rings", "$4.99"], ["Falafel side", "$7.99"], ["Hummus & pita", "$7.99"],
      ["Tabouli", "$4.99"], ["Grape leaves", "$4.99"], ["Fried okra", "$3.99"],
      ["Dill pickle", "$1.49"], ["Pita bread", "$1.99"], ["Chips", "$1.99"],
      ["20oz drink", "$2.99"], ["Baklava", "$2.49"],
    ],
  },
  {
    slug: "chilis",
    name: "Chili's",
    note: boardNote,
    items: [
      ["Chili bowl", "$4.99"], ["Chili hotdog", "$4.99"], ["Chili fries", "$8.99"],
      ["Chili tots", "$8.99"], ["Frito pie", "$8.99"], ["Chili nachos", "$8.99"],
    ],
  },
  {
    slug: "melts",
    name: "Grilled melts",
    note: boardNote,
    items: [
      ["Grilled cheese", "$4.99"], ["Patty melt", "$8.99"], ["Club", "$8.99"],
      ["BLT", "$8.99"], ["Turkey & cheese", "$8.99"], ["Chicken fried steak", "$8.99"],
    ],
  },
  {
    slug: "dinners",
    name: "Dinners",
    note: `Includes fries or salad + soda. ${boardNote}`,
    items: [
      ["Mexican platter", "$14.99"], ["Steak burger platter", "$14.99"], ["Boneless chicken strips", "$14.99"],
    ],
  },
  {
    slug: "kids",
    name: "Kids meals",
    note: `Includes fries or chips + soda. ${boardNote}`,
    items: [
      ["Burger", "$7.99"], ["Nuggets", "$7.99"], ["Hotdog", "$7.99"],
    ],
  },
] as const;

export type ConversionEvent =
  | "view_menu"
  | "click_directions"
  | "click_phone"
  | "click_order"
  | "featured_meal_interaction"
  | "menu_category_view"
  | "story_interaction";

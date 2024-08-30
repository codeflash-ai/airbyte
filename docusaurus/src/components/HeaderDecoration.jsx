import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import styles from "./HeaderDecoration.module.css";
import { Chip } from "./Chip";
import { Callout } from "./Callout";
import { getSupportLevelDisplay } from "../connector_registry";

// Extend Day.js with the relativeTime plugin
dayjs.extend(relativeTime);

// ICONS

const CHECK_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
    <title>Available</title>
    <path
      fill="currentColor"
      d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
    />
  </svg>
);
const CROSS_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
    <title>Not available</title>
    <path
      fill="currentColor"
      d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
    />
  </svg>
);

const USAGE_ICON_HIGH = (
  <svg viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.97608 6.15529C8.35271 5.82927 8.65479 5.42604 8.86183 4.97296C9.06887 4.51988 9.17603 4.02756 9.17602 3.52941C9.17602 2.59335 8.80419 1.69563 8.14233 1.03374C7.48047 0.371848 6.5828 0 5.64678 0C4.71077 0 3.8131 0.371848 3.15123 1.03374C2.48937 1.69563 2.11754 2.59335 2.11754 3.52941C2.11754 4.02756 2.22469 4.51988 2.43173 4.97296C2.63878 5.42604 2.94086 5.82927 3.31749 6.15529C2.3294 6.60274 1.49108 7.32531 0.902766 8.23662C0.314452 9.14792 0.00103891 10.2094 0 11.2941C0 11.4813 0.0743659 11.6609 0.206738 11.7933C0.33911 11.9256 0.518645 12 0.705848 12C0.893051 12 1.07259 11.9256 1.20496 11.7933C1.33733 11.6609 1.4117 11.4813 1.4117 11.2941C1.4117 10.1708 1.85789 9.09358 2.65212 8.29931C3.44636 7.50504 4.52357 7.05882 5.64678 7.05882C6.77 7.05882 7.84721 7.50504 8.64144 8.29931C9.43568 9.09358 9.88187 10.1708 9.88187 11.2941C9.88187 11.4813 9.95624 11.6609 10.0886 11.7933C10.221 11.9256 10.4005 12 10.5877 12C10.7749 12 10.9545 11.9256 11.0868 11.7933C11.2192 11.6609 11.2936 11.4813 11.2936 11.2941C11.2925 10.2094 10.9791 9.14792 10.3908 8.23662C9.80249 7.32531 8.96417 6.60274 7.97608 6.15529ZM5.64678 5.64706C5.22797 5.64706 4.81857 5.52286 4.47034 5.29017C4.12211 5.05748 3.8507 4.72675 3.69043 4.3398C3.53016 3.95285 3.48822 3.52706 3.56993 3.11628C3.65163 2.7055 3.85331 2.32817 4.14945 2.03201C4.4456 1.73585 4.82291 1.53416 5.23367 1.45245C5.64443 1.37074 6.0702 1.41268 6.45713 1.57296C6.84406 1.73324 7.17478 2.00466 7.40746 2.35291C7.64014 2.70116 7.76433 3.11058 7.76433 3.52941C7.76433 4.09105 7.54123 4.62968 7.14411 5.02681C6.747 5.42395 6.20839 5.64706 5.64678 5.64706Z"
      fill="currentColor"
    />
    <path
      d="M14.6393 5.87294C15.091 5.36423 15.3861 4.7358 15.489 4.0633C15.5919 3.39079 15.4983 2.70288 15.2193 2.08235C14.9404 1.46183 14.4881 0.93515 13.9168 0.56571C13.3456 0.196271 12.6797 -0.000181835 11.9994 1.2629e-07C11.8122 1.2629e-07 11.6327 0.0743696 11.5003 0.206748C11.3679 0.339127 11.2936 0.518671 11.2936 0.705882C11.2936 0.893094 11.3679 1.07264 11.5003 1.20502C11.6327 1.3374 11.8122 1.41176 11.9994 1.41176C12.561 1.41176 13.0996 1.63487 13.4968 2.03201C13.8939 2.42915 14.117 2.96778 14.117 3.52941C14.116 3.90017 14.0177 4.26417 13.8319 4.585C13.646 4.90584 13.3793 5.17227 13.0582 5.35765C12.9535 5.41801 12.8661 5.50423 12.8044 5.60805C12.7426 5.71187 12.7084 5.82981 12.7053 5.95059C12.7023 6.07042 12.7299 6.18903 12.7855 6.29524C12.8411 6.40145 12.9228 6.49176 13.0229 6.55765L13.2982 6.74118L13.3899 6.79059C14.2408 7.19415 14.9586 7.83246 15.4588 8.63034C15.959 9.42821 16.2208 10.3524 16.2133 11.2941C16.2133 11.4813 16.2877 11.6609 16.4201 11.7933C16.5525 11.9256 16.732 12 16.9192 12C17.1064 12 17.2859 11.9256 17.4183 11.7933C17.5507 11.6609 17.625 11.4813 17.625 11.2941C17.6308 10.2109 17.3595 9.14418 16.8369 8.19534C16.3144 7.2465 15.5579 6.44704 14.6393 5.87294Z"
      fill="currentColor"
    />
    <path
      d="M20.9708 5.87294C21.4226 5.36423 21.7176 4.7358 21.8205 4.0633C21.9235 3.39079 21.8298 2.70288 21.5509 2.08235C21.272 1.46183 20.8196 0.93515 20.2484 0.56571C19.6771 0.196271 19.0113 -0.000181835 18.331 1.2629e-07C18.1438 1.2629e-07 17.9642 0.0743696 17.8319 0.206748C17.6995 0.339127 17.6251 0.518671 17.6251 0.705882C17.6251 0.893094 17.6995 1.07264 17.8319 1.20502C17.9642 1.3374 18.1438 1.41176 18.331 1.41176C18.8926 1.41176 19.4312 1.63487 19.8283 2.03201C20.2254 2.42915 20.4485 2.96778 20.4485 3.52941C20.4475 3.90017 20.3492 4.26417 20.1634 4.585C19.9776 4.90584 19.7108 5.17227 19.3897 5.35765C19.2851 5.41801 19.1977 5.50423 19.1359 5.60805C19.0741 5.71187 19.04 5.82981 19.0368 5.95059C19.0339 6.07042 19.0615 6.18903 19.117 6.29524C19.1726 6.40145 19.2543 6.49176 19.3545 6.55765L19.6297 6.74118L19.7215 6.79059C20.5723 7.19415 21.2901 7.83246 21.7903 8.63034C22.2905 9.42821 22.5523 10.3524 22.5449 11.2941C22.5449 11.4813 22.6192 11.6609 22.7516 11.7933C22.884 11.9256 23.0635 12 23.2507 12C23.4379 12 23.6175 11.9256 23.7498 11.7933C23.8822 11.6609 23.9566 11.4813 23.9566 11.2941C23.9623 10.2109 23.6911 9.14418 23.1685 8.19534C22.6459 7.2465 21.8894 6.44704 20.9708 5.87294Z"
      fill="currentColor"
    />
  </svg>
);

const USAGE_ICON_MEDIUM = (
  <svg viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.97608 6.15529C8.35271 5.82927 8.65479 5.42604 8.86183 4.97296C9.06887 4.51988 9.17603 4.02756 9.17602 3.52941C9.17602 2.59335 8.80419 1.69563 8.14233 1.03374C7.48047 0.371848 6.5828 0 5.64678 0C4.71077 0 3.8131 0.371848 3.15123 1.03374C2.48937 1.69563 2.11754 2.59335 2.11754 3.52941C2.11754 4.02756 2.22469 4.51988 2.43173 4.97296C2.63878 5.42604 2.94086 5.82927 3.31749 6.15529C2.3294 6.60274 1.49108 7.32531 0.902766 8.23662C0.314452 9.14792 0.00103891 10.2094 0 11.2941C0 11.4813 0.0743659 11.6609 0.206738 11.7933C0.33911 11.9256 0.518645 12 0.705848 12C0.893051 12 1.07259 11.9256 1.20496 11.7933C1.33733 11.6609 1.4117 11.4813 1.4117 11.2941C1.4117 10.1708 1.85789 9.09358 2.65212 8.29931C3.44636 7.50504 4.52357 7.05882 5.64678 7.05882C6.77 7.05882 7.84721 7.50504 8.64144 8.29931C9.43568 9.09358 9.88187 10.1708 9.88187 11.2941C9.88187 11.4813 9.95624 11.6609 10.0886 11.7933C10.221 11.9256 10.4005 12 10.5877 12C10.7749 12 10.9545 11.9256 11.0868 11.7933C11.2192 11.6609 11.2936 11.4813 11.2936 11.2941C11.2925 10.2094 10.9791 9.14792 10.3908 8.23662C9.80249 7.32531 8.96417 6.60274 7.97608 6.15529ZM5.64678 5.64706C5.22797 5.64706 4.81857 5.52286 4.47034 5.29017C4.12211 5.05748 3.8507 4.72675 3.69043 4.3398C3.53016 3.95285 3.48822 3.52706 3.56993 3.11628C3.65163 2.7055 3.85331 2.32817 4.14945 2.03201C4.4456 1.73585 4.82291 1.53416 5.23367 1.45245C5.64443 1.37074 6.0702 1.41268 6.45713 1.57296C6.84406 1.73324 7.17478 2.00466 7.40746 2.35291C7.64014 2.70116 7.76433 3.11058 7.76433 3.52941C7.76433 4.09105 7.54123 4.62968 7.14411 5.02681C6.747 5.42395 6.20839 5.64706 5.64678 5.64706Z"
      fill="currentColor"
    />
    <path
      d="M14.6393 5.87294C15.091 5.36423 15.3861 4.7358 15.489 4.0633C15.5919 3.39079 15.4983 2.70288 15.2193 2.08235C14.9404 1.46183 14.4881 0.93515 13.9168 0.56571C13.3456 0.196271 12.6797 -0.000181835 11.9994 1.2629e-07C11.8122 1.2629e-07 11.6327 0.0743696 11.5003 0.206748C11.3679 0.339127 11.2936 0.518671 11.2936 0.705882C11.2936 0.893094 11.3679 1.07264 11.5003 1.20502C11.6327 1.3374 11.8122 1.41176 11.9994 1.41176C12.561 1.41176 13.0996 1.63487 13.4968 2.03201C13.8939 2.42915 14.117 2.96778 14.117 3.52941C14.116 3.90017 14.0177 4.26417 13.8319 4.585C13.646 4.90584 13.3793 5.17227 13.0582 5.35765C12.9535 5.41801 12.8661 5.50423 12.8044 5.60805C12.7426 5.71187 12.7084 5.82981 12.7053 5.95059C12.7023 6.07042 12.7299 6.18903 12.7855 6.29524C12.8411 6.40145 12.9228 6.49176 13.0229 6.55765L13.2982 6.74118L13.3899 6.79059C14.2408 7.19415 14.9586 7.83246 15.4588 8.63034C15.959 9.42821 16.2208 10.3524 16.2133 11.2941C16.2133 11.4813 16.2877 11.6609 16.4201 11.7933C16.5525 11.9256 16.732 12 16.9192 12C17.1064 12 17.2859 11.9256 17.4183 11.7933C17.5507 11.6609 17.625 11.4813 17.625 11.2941C17.6308 10.2109 17.3595 9.14418 16.8369 8.19534C16.3144 7.2465 15.5579 6.44704 14.6393 5.87294Z"
      fill="currentColor"
    />
    <path
      d="M20.9708 5.87294C21.4226 5.36423 21.7176 4.7358 21.8205 4.0633C21.9235 3.39079 21.8298 2.70288 21.5509 2.08235C21.272 1.46183 20.8196 0.93515 20.2484 0.56571C19.6771 0.196271 19.0113 -0.000181835 18.331 1.2629e-07C18.1438 1.2629e-07 17.9642 0.0743696 17.8319 0.206748C17.6995 0.339127 17.6251 0.518671 17.6251 0.705882C17.6251 0.893094 17.6995 1.07264 17.8319 1.20502C17.9642 1.3374 18.1438 1.41176 18.331 1.41176C18.8926 1.41176 19.4312 1.63487 19.8283 2.03201C20.2254 2.42915 20.4485 2.96778 20.4485 3.52941C20.4475 3.90017 20.3492 4.26417 20.1634 4.585C19.9776 4.90584 19.7108 5.17227 19.3897 5.35765C19.2851 5.41801 19.1977 5.50423 19.1359 5.60805C19.0741 5.71187 19.04 5.82981 19.0368 5.95059C19.0339 6.07042 19.0615 6.18903 19.117 6.29524C19.1726 6.40145 19.2543 6.49176 19.3545 6.55765L19.6297 6.74118L19.7215 6.79059C20.5723 7.19415 21.2901 7.83246 21.7903 8.63034C22.2905 9.42821 22.5523 10.3524 22.5449 11.2941C22.5449 11.4813 22.6192 11.6609 22.7516 11.7933C22.884 11.9256 23.0635 12 23.2507 12C23.4379 12 23.6175 11.9256 23.7498 11.7933C23.8822 11.6609 23.9566 11.4813 23.9566 11.2941C23.9623 10.2109 23.6911 9.14418 23.1685 8.19534C22.6459 7.2465 21.8894 6.44704 20.9708 5.87294Z"
      opacity="0.12"
      fill="currentColor"
    />
  </svg>
);

const USAGE_ICON_LOW = (
  <svg viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.97608 6.15529C8.35271 5.82927 8.65479 5.42604 8.86183 4.97296C9.06887 4.51988 9.17603 4.02756 9.17602 3.52941C9.17602 2.59335 8.80419 1.69563 8.14233 1.03374C7.48047 0.371848 6.5828 0 5.64678 0C4.71077 0 3.8131 0.371848 3.15123 1.03374C2.48937 1.69563 2.11754 2.59335 2.11754 3.52941C2.11754 4.02756 2.22469 4.51988 2.43173 4.97296C2.63878 5.42604 2.94086 5.82927 3.31749 6.15529C2.3294 6.60274 1.49108 7.32531 0.902766 8.23662C0.314452 9.14792 0.00103891 10.2094 0 11.2941C0 11.4813 0.0743659 11.6609 0.206738 11.7933C0.33911 11.9256 0.518645 12 0.705848 12C0.893051 12 1.07259 11.9256 1.20496 11.7933C1.33733 11.6609 1.4117 11.4813 1.4117 11.2941C1.4117 10.1708 1.85789 9.09358 2.65212 8.29931C3.44636 7.50504 4.52357 7.05882 5.64678 7.05882C6.77 7.05882 7.84721 7.50504 8.64144 8.29931C9.43568 9.09358 9.88187 10.1708 9.88187 11.2941C9.88187 11.4813 9.95624 11.6609 10.0886 11.7933C10.221 11.9256 10.4005 12 10.5877 12C10.7749 12 10.9545 11.9256 11.0868 11.7933C11.2192 11.6609 11.2936 11.4813 11.2936 11.2941C11.2925 10.2094 10.9791 9.14792 10.3908 8.23662C9.80249 7.32531 8.96417 6.60274 7.97608 6.15529ZM5.64678 5.64706C5.22797 5.64706 4.81857 5.52286 4.47034 5.29017C4.12211 5.05748 3.8507 4.72675 3.69043 4.3398C3.53016 3.95285 3.48822 3.52706 3.56993 3.11628C3.65163 2.7055 3.85331 2.32817 4.14945 2.03201C4.4456 1.73585 4.82291 1.53416 5.23367 1.45245C5.64443 1.37074 6.0702 1.41268 6.45713 1.57296C6.84406 1.73324 7.17478 2.00466 7.40746 2.35291C7.64014 2.70116 7.76433 3.11058 7.76433 3.52941C7.76433 4.09105 7.54123 4.62968 7.14411 5.02681C6.747 5.42395 6.20839 5.64706 5.64678 5.64706Z"
      fill="currentColor"
    />
    <path
      d="M14.6393 5.87294C15.091 5.36423 15.3861 4.7358 15.489 4.0633C15.5919 3.39079 15.4983 2.70288 15.2193 2.08235C14.9404 1.46183 14.4881 0.93515 13.9168 0.56571C13.3456 0.196271 12.6797 -0.000181835 11.9994 1.2629e-07C11.8122 1.2629e-07 11.6327 0.0743696 11.5003 0.206748C11.3679 0.339127 11.2936 0.518671 11.2936 0.705882C11.2936 0.893094 11.3679 1.07264 11.5003 1.20502C11.6327 1.3374 11.8122 1.41176 11.9994 1.41176C12.561 1.41176 13.0996 1.63487 13.4968 2.03201C13.8939 2.42915 14.117 2.96778 14.117 3.52941C14.116 3.90017 14.0177 4.26417 13.8319 4.585C13.646 4.90584 13.3793 5.17227 13.0582 5.35765C12.9535 5.41801 12.8661 5.50423 12.8044 5.60805C12.7426 5.71187 12.7084 5.82981 12.7053 5.95059C12.7023 6.07042 12.7299 6.18903 12.7855 6.29524C12.8411 6.40145 12.9228 6.49176 13.0229 6.55765L13.2982 6.74118L13.3899 6.79059C14.2408 7.19415 14.9586 7.83246 15.4588 8.63034C15.959 9.42821 16.2208 10.3524 16.2133 11.2941C16.2133 11.4813 16.2877 11.6609 16.4201 11.7933C16.5525 11.9256 16.732 12 16.9192 12C17.1064 12 17.2859 11.9256 17.4183 11.7933C17.5507 11.6609 17.625 11.4813 17.625 11.2941C17.6308 10.2109 17.3595 9.14418 16.8369 8.19534C16.3144 7.2465 15.5579 6.44704 14.6393 5.87294Z"
      opacity="0.12"
      fill="currentColor"
    />
    <path
      d="M20.9708 5.87294C21.4226 5.36423 21.7176 4.7358 21.8205 4.0633C21.9235 3.39079 21.8298 2.70288 21.5509 2.08235C21.272 1.46183 20.8196 0.93515 20.2484 0.56571C19.6771 0.196271 19.0113 -0.000181835 18.331 1.2629e-07C18.1438 1.2629e-07 17.9642 0.0743696 17.8319 0.206748C17.6995 0.339127 17.6251 0.518671 17.6251 0.705882C17.6251 0.893094 17.6995 1.07264 17.8319 1.20502C17.9642 1.3374 18.1438 1.41176 18.331 1.41176C18.8926 1.41176 19.4312 1.63487 19.8283 2.03201C20.2254 2.42915 20.4485 2.96778 20.4485 3.52941C20.4475 3.90017 20.3492 4.26417 20.1634 4.585C19.9776 4.90584 19.7108 5.17227 19.3897 5.35765C19.2851 5.41801 19.1977 5.50423 19.1359 5.60805C19.0741 5.71187 19.04 5.82981 19.0368 5.95059C19.0339 6.07042 19.0615 6.18903 19.117 6.29524C19.1726 6.40145 19.2543 6.49176 19.3545 6.55765L19.6297 6.74118L19.7215 6.79059C20.5723 7.19415 21.2901 7.83246 21.7903 8.63034C22.2905 9.42821 22.5523 10.3524 22.5449 11.2941C22.5449 11.4813 22.6192 11.6609 22.7516 11.7933C22.884 11.9256 23.0635 12 23.2507 12C23.4379 12 23.6175 11.9256 23.7498 11.7933C23.8822 11.6609 23.9566 11.4813 23.9566 11.2941C23.9623 10.2109 23.6911 9.14418 23.1685 8.19534C22.6459 7.2465 21.8894 6.44704 20.9708 5.87294Z"
      opacity="0.12"
      fill="currentColor"
    />
  </svg>
);

const USAGE_ICON = {
  high: USAGE_ICON_HIGH,
  medium: USAGE_ICON_MEDIUM,
  low: USAGE_ICON_LOW,
};

const SUCCESS_ICON_HIGH = (
  <svg viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.63163 4.074L5.05776 6.654L4.0678 5.664C4.01402 5.60119 3.94783 5.55018 3.8734 5.51416C3.79896 5.47815 3.71788 5.45791 3.63526 5.45472C3.55263 5.45153 3.47023 5.46545 3.39324 5.49562C3.31625 5.52578 3.24633 5.57154 3.18786 5.63001C3.12939 5.68848 3.08363 5.75841 3.05347 5.8354C3.02331 5.9124 3.00938 5.9948 3.01258 6.07743C3.01577 6.16006 3.03601 6.24114 3.07202 6.31558C3.10803 6.39002 3.15904 6.45621 3.22185 6.51L4.63178 7.926C4.68784 7.98161 4.75432 8.0256 4.82742 8.05546C4.90052 8.08532 4.9788 8.10045 5.05776 8.1C5.21515 8.09934 5.36598 8.03684 5.47774 7.926L8.47759 4.926C8.53382 4.87022 8.57846 4.80386 8.60892 4.73074C8.63938 4.65763 8.65506 4.57921 8.65506 4.5C8.65506 4.42079 8.63938 4.34237 8.60892 4.26925C8.57846 4.19614 8.53382 4.12978 8.47759 4.074C8.36518 3.96225 8.21311 3.89952 8.05461 3.89952C7.89611 3.89952 7.74404 3.96225 7.63163 4.074ZM5.99971 0C4.81308 0 3.6531 0.351894 2.66645 1.01118C1.6798 1.67047 0.910807 2.60754 0.456703 3.7039C0.00259958 4.80025 -0.116215 6.00665 0.115285 7.17054C0.346785 8.33443 0.918202 9.40352 1.75728 10.2426C2.59635 11.0818 3.6654 11.6532 4.82923 11.8847C5.99305 12.1162 7.1994 11.9974 8.2957 11.5433C9.392 11.0891 10.329 10.3201 10.9883 9.33342C11.6475 8.34672 11.9994 7.18669 11.9994 6C11.9994 5.21207 11.8442 4.43185 11.5427 3.7039C11.2412 2.97594 10.7993 2.31451 10.2421 1.75736C9.68502 1.20021 9.02362 0.758251 8.2957 0.456723C7.56778 0.155195 6.7876 0 5.99971 0ZM5.99971 10.8C5.05041 10.8 4.12242 10.5185 3.3331 9.99105C2.54379 9.46362 1.92859 8.71396 1.5653 7.83688C1.20202 6.95979 1.10697 5.99467 1.29217 5.06357C1.47737 4.13246 1.9345 3.27718 2.60576 2.60589C3.27702 1.93459 4.13226 1.47744 5.06332 1.29223C5.99439 1.10702 6.95946 1.20208 7.8365 1.56538C8.71354 1.92868 9.46316 2.54391 9.99057 3.33326C10.518 4.12262 10.7995 5.05065 10.7995 6C10.7995 7.27304 10.2938 8.49394 9.39366 9.39411C8.49353 10.2943 7.27269 10.8 5.99971 10.8Z"
      fill="currentColor"
    />
    <path
      d="M11.36 11.6122C10.9816 11.4691 10.9368 10.9754 11.2196 10.6861V10.6861C11.395 10.5066 11.6617 10.4485 11.8987 10.5313C12.405 10.7082 12.94 10.8 13.482 10.8C14.7549 10.8 15.9758 10.2943 16.8759 9.39411C17.776 8.49394 18.2817 7.27304 18.2817 6C18.2817 5.05065 18.0002 4.12262 17.4728 3.33326C16.9454 2.54391 16.1958 1.92868 15.3188 1.56538C14.4417 1.20208 13.4766 1.10702 12.5456 1.29223C12.3254 1.33603 12.1094 1.39505 11.8991 1.46851C11.6621 1.55131 11.3954 1.49327 11.2199 1.31371V1.31371C10.9372 1.02437 10.9821 0.53067 11.3605 0.387622C12.0349 0.13264 12.7534 0 13.482 0C14.2699 0 15.05 0.155195 15.7779 0.456723C16.5059 0.758251 17.1673 1.20021 17.7244 1.75736C18.2815 2.31451 18.7235 2.97594 19.025 3.7039C19.3265 4.43185 19.4817 5.21207 19.4817 6C19.4817 7.18669 19.1298 8.34672 18.4705 9.33342C17.8113 10.3201 16.8743 11.0891 15.7779 11.5433C14.6816 11.9974 13.4753 12.1162 12.3115 11.8847C11.9859 11.8199 11.6678 11.7286 11.36 11.6122Z"
      fill="currentColor"
    />
    <path
      d="M13.3319 5.86022C13.2017 5.99076 13.1295 6.16725 13.12 6.3514C13.0931 6.87213 13.0068 7.37715 12.8677 7.85981C12.8494 7.92323 12.9131 7.97248 12.96 7.926V7.926L15.9598 4.926C16.0161 4.87022 16.0607 4.80386 16.0912 4.73074C16.1216 4.65763 16.1373 4.57921 16.1373 4.5C16.1373 4.42079 16.1216 4.34237 16.0912 4.26925C16.0607 4.19614 16.0161 4.12978 15.9598 4.074C15.8474 3.96225 15.6954 3.89952 15.5369 3.89952C15.3784 3.89952 15.2263 3.96225 15.1139 4.074L13.3319 5.86022Z"
      fill="currentColor"
    />
    <path
      d="M18.8421 11.6122C18.4637 11.4691 18.4189 10.9754 18.7017 10.6861V10.6861C18.8771 10.5066 19.1439 10.4485 19.3809 10.5313C19.8871 10.7082 20.4221 10.8 20.9641 10.8C22.2371 10.8 23.4579 10.2943 24.358 9.39411C25.2582 8.49394 25.7638 7.27304 25.7638 6C25.7638 5.05065 25.4823 4.12262 24.9549 3.33326C24.4275 2.54391 23.6779 1.92868 22.8009 1.56538C21.9238 1.20208 20.9588 1.10702 20.0277 1.29223C19.8075 1.33603 19.5915 1.39505 19.3812 1.46851C19.1442 1.55131 18.8775 1.49327 18.702 1.31371V1.31371C18.4193 1.02437 18.4642 0.53067 18.8426 0.387622C19.5171 0.13264 20.2355 0 20.9641 0C21.752 0 22.5321 0.155195 23.2601 0.456723C23.988 0.758251 24.6494 1.20021 25.2065 1.75736C25.7636 2.31451 26.2056 2.97594 26.5071 3.7039C26.8086 4.43185 26.9638 5.21207 26.9638 6C26.9638 7.18669 26.6119 8.34672 25.9526 9.33342C25.2934 10.3201 24.3564 11.0891 23.2601 11.5433C22.1638 11.9974 20.9574 12.1162 19.7936 11.8847C19.468 11.8199 19.1499 11.7286 18.8421 11.6122Z"
      fill="currentColor"
    />
    <path
      d="M20.814 5.86022C20.6838 5.99076 20.6116 6.16725 20.6021 6.3514C20.5752 6.87213 20.4889 7.37715 20.3498 7.85981C20.3315 7.92323 20.3952 7.97248 20.4421 7.926V7.926L23.442 4.926C23.4982 4.87022 23.5428 4.80386 23.5733 4.73074C23.6037 4.65763 23.6194 4.57921 23.6194 4.5C23.6194 4.42079 23.6037 4.34237 23.5733 4.26925C23.5428 4.19614 23.4982 4.12978 23.442 4.074C23.3295 3.96225 23.1775 3.89952 23.019 3.89952C22.8605 3.89952 22.7084 3.96225 22.596 4.074L20.814 5.86022Z"
      fill="currentColor"
    />
  </svg>
);

const SUCCESS_ICON_MEDIUM = (
  <svg viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.63163 4.074L5.05776 6.654L4.0678 5.664C4.01402 5.60119 3.94783 5.55018 3.8734 5.51416C3.79896 5.47815 3.71788 5.45791 3.63526 5.45472C3.55263 5.45153 3.47023 5.46545 3.39324 5.49562C3.31625 5.52578 3.24633 5.57154 3.18786 5.63001C3.12939 5.68848 3.08363 5.75841 3.05347 5.8354C3.02331 5.9124 3.00938 5.9948 3.01258 6.07743C3.01577 6.16006 3.03601 6.24114 3.07202 6.31558C3.10803 6.39002 3.15904 6.45621 3.22185 6.51L4.63178 7.926C4.68784 7.98161 4.75432 8.0256 4.82742 8.05546C4.90052 8.08532 4.9788 8.10045 5.05776 8.1C5.21515 8.09934 5.36598 8.03684 5.47774 7.926L8.47759 4.926C8.53382 4.87022 8.57846 4.80386 8.60892 4.73074C8.63938 4.65763 8.65506 4.57921 8.65506 4.5C8.65506 4.42079 8.63938 4.34237 8.60892 4.26925C8.57846 4.19614 8.53382 4.12978 8.47759 4.074C8.36518 3.96225 8.21311 3.89952 8.05461 3.89952C7.89611 3.89952 7.74404 3.96225 7.63163 4.074ZM5.99971 0C4.81308 0 3.6531 0.351894 2.66645 1.01118C1.6798 1.67047 0.910807 2.60754 0.456703 3.7039C0.00259958 4.80025 -0.116215 6.00665 0.115285 7.17054C0.346785 8.33443 0.918202 9.40352 1.75728 10.2426C2.59635 11.0818 3.6654 11.6532 4.82923 11.8847C5.99305 12.1162 7.1994 11.9974 8.2957 11.5433C9.392 11.0891 10.329 10.3201 10.9883 9.33342C11.6475 8.34672 11.9994 7.18669 11.9994 6C11.9994 5.21207 11.8442 4.43185 11.5427 3.7039C11.2412 2.97594 10.7993 2.31451 10.2421 1.75736C9.68502 1.20021 9.02362 0.758251 8.2957 0.456723C7.56778 0.155195 6.7876 0 5.99971 0ZM5.99971 10.8C5.05041 10.8 4.12242 10.5185 3.3331 9.99105C2.54379 9.46362 1.92859 8.71396 1.5653 7.83688C1.20202 6.95979 1.10697 5.99467 1.29217 5.06357C1.47737 4.13246 1.9345 3.27718 2.60576 2.60589C3.27702 1.93459 4.13226 1.47744 5.06332 1.29223C5.99439 1.10702 6.95946 1.20208 7.8365 1.56538C8.71354 1.92868 9.46316 2.54391 9.99057 3.33326C10.518 4.12262 10.7995 5.05065 10.7995 6C10.7995 7.27304 10.2938 8.49394 9.39366 9.39411C8.49353 10.2943 7.27269 10.8 5.99971 10.8Z"
      fill="currentColor"
    />
    <path
      d="M11.36 11.6122C10.9816 11.4691 10.9368 10.9754 11.2196 10.6861V10.6861C11.395 10.5066 11.6617 10.4485 11.8987 10.5313C12.405 10.7082 12.94 10.8 13.482 10.8C14.7549 10.8 15.9758 10.2943 16.8759 9.39411C17.776 8.49394 18.2817 7.27304 18.2817 6C18.2817 5.05065 18.0002 4.12262 17.4728 3.33326C16.9454 2.54391 16.1958 1.92868 15.3188 1.56538C14.4417 1.20208 13.4766 1.10702 12.5456 1.29223C12.3254 1.33603 12.1094 1.39505 11.8991 1.46851C11.6621 1.55131 11.3954 1.49327 11.2199 1.31371V1.31371C10.9372 1.02437 10.9821 0.53067 11.3605 0.387622C12.0349 0.13264 12.7534 0 13.482 0C14.2699 0 15.05 0.155195 15.7779 0.456723C16.5059 0.758251 17.1673 1.20021 17.7244 1.75736C18.2815 2.31451 18.7235 2.97594 19.025 3.7039C19.3265 4.43185 19.4817 5.21207 19.4817 6C19.4817 7.18669 19.1298 8.34672 18.4705 9.33342C17.8113 10.3201 16.8743 11.0891 15.7779 11.5433C14.6816 11.9974 13.4753 12.1162 12.3115 11.8847C11.9859 11.8199 11.6678 11.7286 11.36 11.6122Z"
      fill="currentColor"
    />
    <path
      d="M13.3319 5.86022C13.2017 5.99076 13.1295 6.16725 13.12 6.3514C13.0931 6.87213 13.0068 7.37715 12.8677 7.85981C12.8494 7.92323 12.9131 7.97248 12.96 7.926V7.926L15.9598 4.926C16.0161 4.87022 16.0607 4.80386 16.0912 4.73074C16.1216 4.65763 16.1373 4.57921 16.1373 4.5C16.1373 4.42079 16.1216 4.34237 16.0912 4.26925C16.0607 4.19614 16.0161 4.12978 15.9598 4.074C15.8474 3.96225 15.6954 3.89952 15.5369 3.89952C15.3784 3.89952 15.2263 3.96225 15.1139 4.074L13.3319 5.86022Z"
      fill="currentColor"
    />
    <path
      d="M18.8421 11.6122C18.4637 11.4691 18.4189 10.9754 18.7017 10.6861V10.6861C18.8771 10.5066 19.1439 10.4485 19.3809 10.5313C19.8871 10.7082 20.4221 10.8 20.9641 10.8C22.2371 10.8 23.4579 10.2943 24.358 9.39411C25.2582 8.49394 25.7638 7.27304 25.7638 6C25.7638 5.05065 25.4823 4.12262 24.9549 3.33326C24.4275 2.54391 23.6779 1.92868 22.8009 1.56538C21.9238 1.20208 20.9588 1.10702 20.0277 1.29223C19.8075 1.33603 19.5915 1.39505 19.3812 1.46851C19.1442 1.55131 18.8775 1.49327 18.702 1.31371V1.31371C18.4193 1.02437 18.4642 0.53067 18.8426 0.387622C19.5171 0.13264 20.2355 0 20.9641 0C21.752 0 22.5321 0.155195 23.2601 0.456723C23.988 0.758251 24.6494 1.20021 25.2065 1.75736C25.7636 2.31451 26.2056 2.97594 26.5071 3.7039C26.8086 4.43185 26.9638 5.21207 26.9638 6C26.9638 7.18669 26.6119 8.34672 25.9526 9.33342C25.2934 10.3201 24.3564 11.0891 23.2601 11.5433C22.1638 11.9974 20.9574 12.1162 19.7936 11.8847C19.468 11.8199 19.1499 11.7286 18.8421 11.6122Z"
      opacity="0.12"
      fill="currentColor"
    />
    <path
      d="M20.814 5.86022C20.6838 5.99076 20.6116 6.16725 20.6021 6.3514C20.5752 6.87213 20.4889 7.37715 20.3498 7.85981C20.3315 7.92323 20.3952 7.97248 20.4421 7.926V7.926L23.442 4.926C23.4982 4.87022 23.5428 4.80386 23.5733 4.73074C23.6037 4.65763 23.6194 4.57921 23.6194 4.5C23.6194 4.42079 23.6037 4.34237 23.5733 4.26925C23.5428 4.19614 23.4982 4.12978 23.442 4.074C23.3295 3.96225 23.1775 3.89952 23.019 3.89952C22.8605 3.89952 22.7084 3.96225 22.596 4.074L20.814 5.86022Z"
      opacity="0.12"
      fill="currentColor"
    />
  </svg>
);

const SUCCESS_ICON_LOW = (
  <svg viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.63163 4.074L5.05776 6.654L4.0678 5.664C4.01402 5.60119 3.94783 5.55018 3.8734 5.51416C3.79896 5.47815 3.71788 5.45791 3.63526 5.45472C3.55263 5.45153 3.47023 5.46545 3.39324 5.49562C3.31625 5.52578 3.24633 5.57154 3.18786 5.63001C3.12939 5.68848 3.08363 5.75841 3.05347 5.8354C3.02331 5.9124 3.00938 5.9948 3.01258 6.07743C3.01577 6.16006 3.03601 6.24114 3.07202 6.31558C3.10803 6.39002 3.15904 6.45621 3.22185 6.51L4.63178 7.926C4.68784 7.98161 4.75432 8.0256 4.82742 8.05546C4.90052 8.08532 4.9788 8.10045 5.05776 8.1C5.21515 8.09934 5.36598 8.03684 5.47774 7.926L8.47759 4.926C8.53382 4.87022 8.57846 4.80386 8.60892 4.73074C8.63938 4.65763 8.65506 4.57921 8.65506 4.5C8.65506 4.42079 8.63938 4.34237 8.60892 4.26925C8.57846 4.19614 8.53382 4.12978 8.47759 4.074C8.36518 3.96225 8.21311 3.89952 8.05461 3.89952C7.89611 3.89952 7.74404 3.96225 7.63163 4.074ZM5.99971 0C4.81308 0 3.6531 0.351894 2.66645 1.01118C1.6798 1.67047 0.910807 2.60754 0.456703 3.7039C0.00259958 4.80025 -0.116215 6.00665 0.115285 7.17054C0.346785 8.33443 0.918202 9.40352 1.75728 10.2426C2.59635 11.0818 3.6654 11.6532 4.82923 11.8847C5.99305 12.1162 7.1994 11.9974 8.2957 11.5433C9.392 11.0891 10.329 10.3201 10.9883 9.33342C11.6475 8.34672 11.9994 7.18669 11.9994 6C11.9994 5.21207 11.8442 4.43185 11.5427 3.7039C11.2412 2.97594 10.7993 2.31451 10.2421 1.75736C9.68502 1.20021 9.02362 0.758251 8.2957 0.456723C7.56778 0.155195 6.7876 0 5.99971 0ZM5.99971 10.8C5.05041 10.8 4.12242 10.5185 3.3331 9.99105C2.54379 9.46362 1.92859 8.71396 1.5653 7.83688C1.20202 6.95979 1.10697 5.99467 1.29217 5.06357C1.47737 4.13246 1.9345 3.27718 2.60576 2.60589C3.27702 1.93459 4.13226 1.47744 5.06332 1.29223C5.99439 1.10702 6.95946 1.20208 7.8365 1.56538C8.71354 1.92868 9.46316 2.54391 9.99057 3.33326C10.518 4.12262 10.7995 5.05065 10.7995 6C10.7995 7.27304 10.2938 8.49394 9.39366 9.39411C8.49353 10.2943 7.27269 10.8 5.99971 10.8Z"
      fill="currentColor"
    />
    <path
      d="M11.36 11.6122C10.9816 11.4691 10.9368 10.9754 11.2196 10.6861V10.6861C11.395 10.5066 11.6617 10.4485 11.8987 10.5313C12.405 10.7082 12.94 10.8 13.482 10.8C14.7549 10.8 15.9758 10.2943 16.8759 9.39411C17.776 8.49394 18.2817 7.27304 18.2817 6C18.2817 5.05065 18.0002 4.12262 17.4728 3.33326C16.9454 2.54391 16.1958 1.92868 15.3188 1.56538C14.4417 1.20208 13.4766 1.10702 12.5456 1.29223C12.3254 1.33603 12.1094 1.39505 11.8991 1.46851C11.6621 1.55131 11.3954 1.49327 11.2199 1.31371V1.31371C10.9372 1.02437 10.9821 0.53067 11.3605 0.387622C12.0349 0.13264 12.7534 0 13.482 0C14.2699 0 15.05 0.155195 15.7779 0.456723C16.5059 0.758251 17.1673 1.20021 17.7244 1.75736C18.2815 2.31451 18.7235 2.97594 19.025 3.7039C19.3265 4.43185 19.4817 5.21207 19.4817 6C19.4817 7.18669 19.1298 8.34672 18.4705 9.33342C17.8113 10.3201 16.8743 11.0891 15.7779 11.5433C14.6816 11.9974 13.4753 12.1162 12.3115 11.8847C11.9859 11.8199 11.6678 11.7286 11.36 11.6122Z"
      opacity="0.12"
      fill="currentColor"
    />
    <path
      d="M13.3319 5.86022C13.2017 5.99076 13.1295 6.16725 13.12 6.3514C13.0931 6.87213 13.0068 7.37715 12.8677 7.85981C12.8494 7.92323 12.9131 7.97248 12.96 7.926V7.926L15.9598 4.926C16.0161 4.87022 16.0607 4.80386 16.0912 4.73074C16.1216 4.65763 16.1373 4.57921 16.1373 4.5C16.1373 4.42079 16.1216 4.34237 16.0912 4.26925C16.0607 4.19614 16.0161 4.12978 15.9598 4.074C15.8474 3.96225 15.6954 3.89952 15.5369 3.89952C15.3784 3.89952 15.2263 3.96225 15.1139 4.074L13.3319 5.86022Z"
      opacity="0.12"
      fill="currentColor"
    />
    <path
      d="M18.8421 11.6122C18.4637 11.4691 18.4189 10.9754 18.7017 10.6861V10.6861C18.8771 10.5066 19.1439 10.4485 19.3809 10.5313C19.8871 10.7082 20.4221 10.8 20.9641 10.8C22.2371 10.8 23.4579 10.2943 24.358 9.39411C25.2582 8.49394 25.7638 7.27304 25.7638 6C25.7638 5.05065 25.4823 4.12262 24.9549 3.33326C24.4275 2.54391 23.6779 1.92868 22.8009 1.56538C21.9238 1.20208 20.9588 1.10702 20.0277 1.29223C19.8075 1.33603 19.5915 1.39505 19.3812 1.46851C19.1442 1.55131 18.8775 1.49327 18.702 1.31371V1.31371C18.4193 1.02437 18.4642 0.53067 18.8426 0.387622C19.5171 0.13264 20.2355 0 20.9641 0C21.752 0 22.5321 0.155195 23.2601 0.456723C23.988 0.758251 24.6494 1.20021 25.2065 1.75736C25.7636 2.31451 26.2056 2.97594 26.5071 3.7039C26.8086 4.43185 26.9638 5.21207 26.9638 6C26.9638 7.18669 26.6119 8.34672 25.9526 9.33342C25.2934 10.3201 24.3564 11.0891 23.2601 11.5433C22.1638 11.9974 20.9574 12.1162 19.7936 11.8847C19.468 11.8199 19.1499 11.7286 18.8421 11.6122Z"
      opacity="0.12"
      fill="currentColor"
    />
    <path
      d="M20.814 5.86022C20.6838 5.99076 20.6116 6.16725 20.6021 6.3514C20.5752 6.87213 20.4889 7.37715 20.3498 7.85981C20.3315 7.92323 20.3952 7.97248 20.4421 7.926V7.926L23.442 4.926C23.4982 4.87022 23.5428 4.80386 23.5733 4.73074C23.6037 4.65763 23.6194 4.57921 23.6194 4.5C23.6194 4.42079 23.6037 4.34237 23.5733 4.26925C23.5428 4.19614 23.4982 4.12978 23.442 4.074C23.3295 3.96225 23.1775 3.89952 23.019 3.89952C22.8605 3.89952 22.7084 3.96225 22.596 4.074L20.814 5.86022Z"
      opacity="0.12"
      fill="currentColor"
    />
  </svg>
);

const SUCCESS_ICON = {
  high: SUCCESS_ICON_HIGH,
  medium: SUCCESS_ICON_MEDIUM,
  low: SUCCESS_ICON_LOW,
};

// HELPERS

/**
 * Convert a string to a boolean
 *
 * Why? Because MDX doesn't support passing boolean values properly.
 */
const boolStringToBool = (boolString) => {
  // if value is a boolean, return it
  if (typeof boolString === "boolean") return boolString;

  if (boolString?.toUpperCase() === "TRUE") return true;
  if (boolString?.toUpperCase() === "FALSE") return false;

  return null;
};

// COMPONENTS

const MetricIcon = ({ iconComponent, level }) => {
  // sometimes level is the boolean true...
  if (level === undefined || level === null || typeof level !== "string") {
    return null;
  }

  if (!Object.keys(iconComponent).includes(level.toLowerCase())) return null;

  return (
    <div className={styles.metricIcon} title={level}>
      {iconComponent[level?.toLowerCase()]}
    </div>
  );
};

const MetadataStat = ({ label, children }) => (
  <div className={styles.metadataStat}>
    <dt className={styles.metadataStatLabel}>{`${label}: `}</dt>
    <dd className={styles.metadataStatValue}>{children}</dd>
  </div>
);

const EnabledIcon = ({ isEnabled }) => {
  return isEnabled ? CHECK_ICON : CROSS_ICON;
};

const ConnectorMetadataCallout = ({
  isCloud,
  isOss,
  isPyAirbyteConnector,
  isEnterprise,
  supportLevel,
  github_url,
  dockerImageTag,
  cdkVersion,
  isLatestCDK,
  cdkVersionUrl,
  syncSuccessRate,
  usageRate,
  lastUpdated,
}) => (
  <Callout className={styles.connectorMetadataCallout}>
    <dl className={styles.connectorMetadata}>
      <MetadataStat label="Availability">
        <div className={styles.availability}>
          {isEnterprise ? (
            <>
              <Chip className={styles.available}>
                <EnabledIcon isEnabled={true} /> Enterprise License
              </Chip>
            </>
          ) : (
            <>
              <Chip className={isCloud ? styles.available : styles.unavailable}>
                <EnabledIcon isEnabled={isCloud} /> Airbyte Cloud
              </Chip>
              <Chip className={isOss ? styles.available : styles.unavailable}>
                <EnabledIcon isEnabled={isOss} /> Airbyte OSS
              </Chip>
              <Chip
                className={
                  isPyAirbyteConnector ? styles.available : styles.unavailable
                }
              >
                <EnabledIcon isEnabled={isPyAirbyteConnector} /> PyAirbyte
              </Chip>
            </>
          )}
        </div>
      </MetadataStat>
      <MetadataStat label="Support Level">
        <a href="/integrations/connector-support-levels/">
          <Chip>{getSupportLevelDisplay(supportLevel)}</Chip>
        </a>
      </MetadataStat>
      {supportLevel !== "archived" && (
        <MetadataStat label="Connector Version">
          <a href={github_url} target="_blank">
            {dockerImageTag}
          </a>
          {lastUpdated && (
            <span className={styles.deemphasizeText}>{`(Last updated ${dayjs(
              lastUpdated
            ).fromNow()})`}</span>
          )}
        </MetadataStat>
      )}
      {cdkVersion && (
        <MetadataStat label="CDK Version">
          <a target="_blank" href={cdkVersionUrl}>
            {cdkVersion}
          </a>
          {isLatestCDK && (
            <span className={styles.deemphasizeText}>{"(Latest)"}</span>
          )}
        </MetadataStat>
      )}
      {syncSuccessRate && (
        <MetadataStat label="Sync Success Rate">
          <MetricIcon iconComponent={SUCCESS_ICON} level={syncSuccessRate} />
        </MetadataStat>
      )}
      {usageRate && (
        <MetadataStat label="Usage Rate">
          <MetricIcon iconComponent={USAGE_ICON} level={usageRate} />
        </MetadataStat>
      )}
    </dl>
  </Callout>
);

const ConnectorTitle = ({ iconUrl, originalTitle, originalId, isArchived }) => (
  <div className={styles.header}>
    <img src={iconUrl} alt="" className={styles.connectorIcon} />
    <h1 id={originalId}>
      {isArchived ? (
        <span>
          {originalTitle} <span style={{ color: "gray" }}>[ARCHIVED]</span>
        </span>
      ) : (
        originalTitle
      )}
    </h1>
  </div>
);

export const HeaderDecoration = ({
  isOss: isOssString,
  isCloud: isCloudString,
  isPyAirbyteConnector: isPyAirbyteConnectorString,
  isEnterprise: isEnterpriseString,
  dockerImageTag,
  supportLevel,
  iconUrl,
  originalTitle,
  originalId,
  github_url,
  cdkVersion,
  isLatestCDKString,
  cdkVersionUrl,
  syncSuccessRate,
  usageRate,
  lastUpdated,
}) => {
  const isOss = boolStringToBool(isOssString);
  const isCloud = boolStringToBool(isCloudString);
  const isPyAirbyteConnector = boolStringToBool(isPyAirbyteConnectorString);
  const isEnterprise = boolStringToBool(isEnterpriseString);
  const isLatestCDK = boolStringToBool(isLatestCDKString);
  const isArchived = supportLevel?.toUpperCase() === "ARCHIVED";

  return (
    <>
      <ConnectorTitle
        iconUrl={iconUrl}
        originalTitle={originalTitle}
        originalId={originalId}
        isArchived={isArchived}
      />
      <ConnectorMetadataCallout
        isCloud={isCloud}
        isOss={isOss}
        isPyAirbyteConnector={isPyAirbyteConnector}
        isEnterprise={isEnterprise}
        supportLevel={supportLevel}
        github_url={github_url}
        dockerImageTag={dockerImageTag}
        cdkVersion={cdkVersion}
        cdkVersionUrl={cdkVersionUrl}
        isLatestCDK={isLatestCDK}
        syncSuccessRate={syncSuccessRate}
        usageRate={usageRate}
        lastUpdated={lastUpdated}
      />
    </>
  );
};

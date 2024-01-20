import { MdEmail, MdLockPerson, MdLocationOn } from 'react-icons/md';
import { FaUser, FaPhoneAlt, FaBuilding, FaCalendarAlt } from 'react-icons/fa';
import { FaSquarePlus } from "react-icons/fa6";
import { FiMenu } from 'react-icons/fi';
import { IoCalendarNumber, IoSettingsSharp } from "react-icons/io5";

export const emailIcon = (
  <MdEmail size={22} color='#00466D' />
);

export const passwordIcon = (
  <MdLockPerson size={22} color='#00466D' />
);

export const nameIcon = (
  <FaUser size={18} color='#00466D' />
);

export const contactIcon = (
  <FaPhoneAlt size={18} color='#00466D' />
);

export const clinicIcon = (
  <FaBuilding size={18} color='#00466D' />
);

export const addressIcon = (
  <MdLocationOn size={22} color='#00466D' />
);

export const operationIcon = (
  <FaCalendarAlt size={18} color='#00466D' />
);

export const menuIcon = (
  <FiMenu size={30} color='#FFF' />
);

export const calendarIconMenu = (
  <IoCalendarNumber size={20} color='#001B2A' />
);

export const newQueryIconMenu = (
  <FaSquarePlus size={20} color='#001B2A' />
);

export const settingsIconMenu = (
  <IoSettingsSharp size={20} color='#001B2A' />
);
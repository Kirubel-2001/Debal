import { AlertCircle, Hotel, Building2, Building, Home } from "lucide-react";
import SelectionButton from "./SelectionButton";

function RoomDetailsForm({
  formData,
  errors,
  onInputChange,
  onFormDataChange,
}) {
  const accommodationTypes = [
    { value: "room", label: "Room", icon: Hotel },
    { value: "property", label: "Whole property", icon: Building2 },
  ];

  const propertyTypes = [
    { value: "apartment", label: "Apartment", icon: Building },
    { value: "condominium", label: "Condominium", icon: Building2 },
    { value: "house", label: "House", icon: Home },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "any", label: "Any" },
  ];

  const locations = [
    "Bole",
    "Kirkos",
    "Lemle",
    "Cazanchis",
    "Mekanisa",
    "Piassa",
    "Gulele",
    "Addis Ketema",
    "Yeka",
    "Akaki",
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Room details</h2>

      {/* Title and Location */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Listing Title & Location
        </label>
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onInputChange}
              placeholder="Apartment in Bole"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.title}
              </p>
            )}
          </div>

          <div className="w-48">
            <select
              name="location"
              value={formData.location}
              onChange={onInputChange}
              className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc.toLowerCase()}>
                  {loc}
                </option>
              ))}
            </select>
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>
        </div>
      </div>

      {/* Accommodation Type */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-3">
          Accommodation type
        </label>
        <div className="grid grid-cols-2 gap-4">
          {accommodationTypes.map((type) => (
            <SelectionButton
              key={type.value}
              selected={formData.accommodationType === type.value}
              onClick={() =>
                onFormDataChange({ ...formData, accommodationType: type.value })
              }
              icon={type.icon}
              label={type.label}
            />
          ))}
        </div>
      </div>

      {/* Gender */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-3">Gender</label>
        <div className="grid grid-cols-3 gap-4">
          {genderOptions.map((type) => (
            <SelectionButton
              key={type.value}
              selected={formData.gender === type.value}
              onClick={() =>
                onFormDataChange({ ...formData, gender: type.value })
              }
              label={type.label}
            />
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-3">
          Property type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {propertyTypes.map((type) => (
            <SelectionButton
              key={type.value}
              selected={formData.propertyType === type.value}
              onClick={() =>
                onFormDataChange({ ...formData, propertyType: type.value })
              }
              icon={type.icon}
              label={type.label}
            />
          ))}
        </div>
      </div>

      {/* Rent */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-3">Rent</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            Br
          </span>
          <input
            type="number"
            name="rent"
            placeholder="0"
            value={formData.rent}
            onChange={onInputChange}
            className={`w-full pl-12 pr-28 py-3 border-2 rounded-xl focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500 transition-all ${
              errors.rent ? "border-red-500" : "border-gray-200"
            }`}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            per month
          </span>
        </div>
        {errors.rent && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.rent}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onInputChange}
          rows="3"
          placeholder="Describe your room in detail..."
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.description && (
            <p className="text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.description}
            </p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Contact Phone
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onInputChange}
          placeholder="+251................."
          className={`w-min px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.phone}
          </p>
        )}
      </div>
      <hr className="my-8" />
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Photos</h2>
    </>
  );
}

export default RoomDetailsForm;

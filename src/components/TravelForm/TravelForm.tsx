import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import countryRegionData from 'country-region-data/data.json';
import { useEffect, useState } from "react";

import { TravelPreferences } from "../../types/travel-preferences";
import Button from "../Button/Button";
import stylesCSS from "./TravelForm.module.css";

type OptionType = { value: string; label: string };

const options: OptionType[] = [
  { value: "foodie", label: "foodie" },
  { value: "relaxing", label: "relaxing" },
  { value: "adventurous", label: "adventurous" },
  { value: "cultural", label: "cultural" },
];

type Props = {
  onSubmit: (data: TravelPreferences) => void;
};

export default function TravelForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TravelPreferences>();

  const [countries, setCountries] = useState<OptionType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>();
  const [showCitiesCheckmark, setShowCitiesCheckmark] = useState(false);
  const [showCitiesDropdown, setShowCitiesDropdown] = useState(false);
  const [regions, setRegions] = useState<OptionType[]>([]);

  useEffect(() => {
    const countryOptions: OptionType[] = countryRegionData.map((c) => ({
      value: c.countryName,
      label: c.countryName
    }));
    setCountries(countryOptions);
  }, []);

  useEffect(() => {
    const regionsList:OptionType[] = countryRegionData
    .find((c) => c.countryName === selectedCountry)
    ?.regions.map((r) => ({
      value: r.name,
      label: r.name
    })) || [];

    setRegions(regionsList);
  }, [selectedCountry])

  const handleFormSubmit = (data: any) => {
    const selectedStyles = (data.style as OptionType[]).map((opt) => opt.value);
    const selectedCities = (data.cities as OptionType[] | undefined)?.map((opt) => opt.value) || [];

    const payload: TravelPreferences = {
      ...data,
      style: selectedStyles,
      cities: selectedCities
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={stylesCSS.form}>
      <label>Destination</label>
      {/* <input
        type="text"
        placeholder="Type your destination"
        {...register("destination", { required: true, minLength: 2 })}
      /> */}
      <Controller
        control = {control}
        name="destination"
        render={({ field }) => (
          <Select<OptionType>
            options = {countries}
            placeholder = "Select your Destination"
            onChange = {(selected) => {
              const country = selected?.value;
              field.onChange(country);
              setSelectedCountry(country);
              setShowCitiesCheckmark(!!country);
              setShowCitiesDropdown(false);
            }}
          />
        )}
      />

      {showCitiesCheckmark && (
        <div style={{ marginTop: "10px" }}>
          <label>
            {" "}Do you want to specify the cities?
            <input
              type="checkbox"
              onChange={(e) => setShowCitiesDropdown(e.target.checked)}
            />
            
          </label>
        </div>
      )}

    {showCitiesDropdown && selectedCountry && (
      <div style={{ marginTop: "10px" }}>
        <label>Regions</label>
        <Controller
          name="cities"
          control={control}
          render={({ field }) => (
            <Select<OptionType, true>
              isMulti
              options={regions}
              placeholder="Select Cities"
              onChange={(selected) => field.onChange(selected)}
            />
          )}
        />
      </div>
    )}
    

      <label>Start Date</label>
      <Controller
        control={control}
        name="startDate"
        render={({ field }) => (
          <DatePicker
            placeholderText="Select Start Date"
            className={stylesCSS.datePicker}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
          />
        )}
      />

      <label>End Date</label>
      <Controller
        control={control}
        name="endDate"
        render={({ field }) => (
          <DatePicker
            placeholderText="Select End Date"
            className={stylesCSS.datePicker}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
          />
        )}
      />

      <label>Budget</label>
      <input
        type="number"
        placeholder="0"
        {...register("budget", { required: true })}
      />

      <label>Style</label>
      <Controller
        name="style"
        control={control}
        render={({ field }) => (
          <Select<OptionType, true>
            isMulti
            options={options}
            placeholder="Select Style"
            onChange={(selected) => field.onChange(selected)}
          />
        )}
      />

      <Button type="submit" variant="primary" style={{ marginTop: "15px" }}>
        Generate
      </Button>
    </form>
  );
}

import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

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

  const handleFormSubmit = (data: any) => {
    const selectedStyles = (data.style as OptionType[]).map((opt) => opt.value);

    const payload: TravelPreferences = {
      ...data,
      style: selectedStyles,
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={stylesCSS.form}>
      <label>Destination</label>
      <input
        type="text"
        placeholder="Type your destination"
        {...register("destination", { required: true, minLength: 2 })}
      />

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

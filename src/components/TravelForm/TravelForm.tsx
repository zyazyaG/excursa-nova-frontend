import { useForm, Controller } from "react-hook-form";
import countryRegionData from 'country-region-data/data.json';
import { useEffect, useState } from "react";
import { TravelPreferences } from "../../types/travel-preferences";
import Button from "../Button/Button";
import stylesCSS from "./TravelForm.module.css";
import {TextField, Autocomplete, Select, FormControl, InputLabel, MenuItem} from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

type OptionType = { value: string; label: string };

const styleOptions: OptionType[] = [
  { value: "foodie", label: "foodie" },
  { value: "relaxing", label: "relaxing" },
  { value: "adventurous", label: "adventurous" },
  { value: "cultural", label: "cultural" },
];

const budgetOptions: OptionType[] = [
  { value: "<1000", label: "Under $1,000" },
  { value: "1000 - 2500", label: "$1,000 - $2,500" },
  { value: "2500 - 5000", label: "$2,500 - $5,000" },
  { value: "5000 - 10000", label: "$5,000 - $10,000" },
  { value: "10000 - 20000", label: "$10,000 - $20,000" },
  { value: "20000+", label: "Over $20,000" },
];

type Props = {
  onSubmit: (data: TravelPreferences) => void;
  loading: boolean;
};

export default function TravelForm({ onSubmit, loading }: Props) {
  const { control, handleSubmit, formState: { errors }, watch } = useForm<TravelPreferences>({
    mode: "onChange",
    defaultValues: {
      style: [],
      cities: [],
      budget: "",
    }
  });

  const [countries, setCountries] = useState<OptionType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [regions, setRegions] = useState<OptionType[]>([]);

  // Load countries
  useEffect(() => {
    const countryOptions = countryRegionData.map(c => ({
      value: c.countryName,
      label: c.countryName
    }));
    setCountries(countryOptions);
  }, []);

  // Update regions when country changes
  useEffect(() => {
    const foundCountry = countryRegionData.find(c => c.countryName === selectedCountry);
    const regionOptions = foundCountry
      ? foundCountry.regions.map(r => ({ value: r.name, label: r.name }))
      : [];
    setRegions(regionOptions);
  }, [selectedCountry]);

  const handleFormSubmit = (data: TravelPreferences) => {
    onSubmit({
      ...data,
      cities: data.cities || [],
      style: data.style || [],
      budget: data.budget || "",
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={stylesCSS.form}>

        <Controller
          name="destination"
          control={control}
          rules={{ required: "Destination is required" }}
          render={({ field }) => (
            <Autocomplete
              sx={{ my: 2 }}
              options={countries}
              getOptionLabel={(option) => option.label}
              onChange={(_, value) => {
                const val = value?.value || "";
                field.onChange(val);
                setSelectedCountry(val);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination"
                  variant="outlined"
                  fullWidth
                  error={!!errors.destination}
                  helperText={errors.destination?.message}
                />
              )}
            />
          )}
        />

        {selectedCountry && (
          <>
            <label className={stylesCSS.label}>Do you want to specify the cities?</label>
            <Controller
              name="cities"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  sx={{ my: 2 }}
                  options={regions}
                  getOptionLabel={(option) => option.label}
                  onChange={(_, value) => field.onChange(value.map(v => v.value))}
                  renderInput={(params) => (
                    <TextField {...params} label="Cities" variant="outlined" fullWidth />
                  )}
                />
              )}
            />
          </>
        )}

        <Controller
          name="startDate"
          control={control}
          rules={{
            required: "Start date is required",
            validate: value =>
              value && dayjs(value).isBefore(dayjs(), "day")
                ? "Start date cannot be in the past"
                : true
          }}
          render={({ field }) => (
            <DatePicker
              sx={{ my: 2 }}
              label="Start Date"
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.toISOString() || "")}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.startDate,
                  helperText: errors.startDate?.message
                }
              }}
            />
          )}
        />

        <Controller
          name="endDate"
          control={control}
          rules={{
            required: "End date is required",
            validate: value => {
              const start = dayjs(watch("startDate"));
              const end = dayjs(value);
              if (end.isBefore(start, "day")) {
                return "End date must be after start date";
              }
              return true;
            }
          }}
          render={({ field }) => (
            <DatePicker
              sx={{ my: 2 }}
              label="End Date"
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.toISOString() || "")}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.endDate,
                  helperText: errors.endDate?.message
                }
              }}
            />
          )}
        />

        <Controller
          name="budget"
          control={control}
          rules={{ required: "Budget is required" }}
          render={({ field }) => (
            <FormControl fullWidth sx={{ my: 2 }} error={!!errors.budget}>
              <InputLabel>Budget</InputLabel>
              <Select
                label="Budget"
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
              >
                {budgetOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="style"
          control={control}
          render={({ field }) => (
            <Autocomplete
              sx={{ my: 2 }}
              multiple
              options={styleOptions}
              getOptionLabel={(option) => option.label}
              onChange={(_, value) => field.onChange(value.map(v => v.value))}
              renderInput={(params) => (
                <TextField {...params} label="Style" variant="outlined" fullWidth />
              )}
            />
          )}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          style={{ marginTop: "15px", height: "40px" }}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </form>
    </LocalizationProvider>
  );
}

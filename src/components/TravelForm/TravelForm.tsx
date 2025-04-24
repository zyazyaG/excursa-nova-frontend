import { useForm, Controller } from "react-hook-form";
import countryRegionData from 'country-region-data/data.json';
import { useEffect, useState } from "react";
import { TravelPreferences } from "../../types/travel-preferences";
import Button from "../Button/Button";
import stylesCSS from "./TravelForm.module.css";

import { TextField, Checkbox, Autocomplete, InputAdornment } from "@mui/material";
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

type Props = {
  onSubmit: (data: TravelPreferences) => void;
  loading: boolean;
};

export default function TravelForm({ onSubmit, loading }: Props) {
  const { control, handleSubmit, setValue, formState: { errors }, watch  } = useForm<TravelPreferences>({mode: "onChange", shouldUnregister: false});

  const [countries, setCountries] = useState<OptionType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
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
    const regionsList: OptionType[] = countryRegionData
      .find((c) => c.countryName === selectedCountry)
      ?.regions.map((r) => ({
        value: r.name,
        label: r.name
      })) || [];
    setRegions(regionsList);
  }, [selectedCountry]);



  const handleFormSubmit = (data: any) => {
    const selectedStyles = (data.style || []).map((s: OptionType) => s.value);
    const selectedCities = (data.cities || []).map((c: OptionType) => c.value);

    const payload: TravelPreferences = {
      ...data,
      style: selectedStyles,
      cities: selectedCities,
    };

    onSubmit(payload);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={stylesCSS.form}>

        <Controller
          name="destination"
          control={control}
          render={({ field }) => (
            <Autocomplete
              sx={{ my: 2 }}
              options={countries}
              getOptionLabel={(option) => option.label}
              onChange={(_, value) => {
                field.onChange(value?.value || "");
                setSelectedCountry(value?.value || null);
                setShowCitiesCheckmark(!!value?.value);
                setShowCitiesDropdown(false);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          )}
        />

        {showCitiesCheckmark && (
          <div className={stylesCSS.checkmark}>
            <label className={stylesCSS.label}>
              Do you want to specify the cities?
            </label>
            <Checkbox
              onChange={(e) => {
                const checked = e.target.checked;
                setShowCitiesDropdown(checked);
                if (!checked) {
                  setValue("cities", []);
                }
              }}
              checked={showCitiesDropdown}
            />
          </div>
        )}

        {showCitiesDropdown && (
          <Controller
            name="cities"
            control={control}
            render={({ field }) => (
              <Autocomplete
                sx={{ my: 2 }}
                multiple
                options={regions}
                getOptionLabel={(option) => option.label}
                onChange={(_, value) => field.onChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Cities"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            )}
          />
        )}

        <Controller
          name="startDate"
          control={control}
          rules={{
            required: "Start date is required",
            validate: (value) =>
              dayjs(value).isBefore(dayjs(), "day")
                ? "Start date cannot be in the past"
                : true,
          }}
          render={({ field }) => (
            <DatePicker
              sx={{ my: 2 }}
              label="Start Date"
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.toISOString())}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.startDate,
                  helperText: errors.startDate?.message,
                },
              }}
            />
          )}
        />

        <Controller
          name="endDate"
          control={control}
          rules={{
            required: "End date is required",
            validate: (value) => {
              const start = dayjs(watch("startDate"));
              const end = dayjs(value);
              return end.isBefore(start, "day")
                ? "End date must be after start date"
                : true;
            },
          }}
          render={({ field }) => (
            <DatePicker
              sx={{ my: 2 }}
              label="End Date"
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.toISOString())}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.endDate,
                  helperText: errors.endDate?.message,
                },
              }}
            />
          )}
        />

        <Controller
          name="budget"
          control={control}
          rules={{
            required: "Budget is required",
            min: { value: 1, message: "Budget must be greater than 0" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Budget"
              fullWidth
              variant="outlined"
              sx={{ my: 2 }}
              error={!!errors.budget}
              helperText={errors.budget?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
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
              onChange={(_, value) => field.onChange(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Style"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          )}
        />

        <Button type="submit" variant="primary" disabled={loading} style={{ marginTop: "15px", height: "40px" }}>{loading? "Generating..." : "Generate"}</Button>
      </form>
    </LocalizationProvider>
  );
}

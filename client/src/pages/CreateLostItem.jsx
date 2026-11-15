import { useState } from "react";
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { Package, Image, Upload } from "lucide-react";
import LocationPicker from "../components/LocationPicker";
import AppShell from "../components/AppShell.jsx";
import { API_BASE_URL } from "../config";

const CreateLostItem = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      description: "",
      location: "",
      latitude: null,
      longitude: null,
      image: "",
    },
  });

  const imageFile = watch("image");
  const imagePreview =
    imageFile && imageFile.length > 0
      ? URL.createObjectURL(imageFile[0])
      : null;

  const handleCreateLostItemSubmit = async (data) => {
    const token = localStorage.getItem("token");

    if (!data.image?.[0]) {
      console.error("Image file is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    formData.append("image", data.image[0]);

    setSubmitLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/lostitems`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        const error = await response.json();
        console.error(error.message);
        return;
      }
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `field pl-11 pr-3.5 ${hasError ? "field-error" : ""}`;

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <div className="tag">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Lost item
          </div>
          <h1 className="mt-3 type-heading">
            Report what you lost
          </h1>
          <p className="mt-2 text-sm text-secondary">
            Describe what you lost and where, so others can help you find it.
          </p>
        </div>

        <div className="card p-6 md:p-8">
          <form onSubmit={handleSubmit(handleCreateLostItemSubmit)} noValidate>
            <div className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="label"
                >
                  Item name
                </label>
                <div className="relative">
                  <Package
                    size={16}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Blue water bottle"
                    className={inputClass(errors.name)}
                    {...register("name", {
                      required: "Item name is required",
                    })}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="label"
                >
                  Description
                </label>
                <div className="relative">
                  <textarea
                    id="description"
                    rows={4}
                    placeholder="Describe the item and where you last saw it..."
                    className={`${inputClass(errors.description)} resize-none pt-2.5 pl-11`}
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                </div>
                {errors.description && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="label"
                >
                  Location
                </label>
                <LocationPicker
                  value={{
                    location: watch("location"),
                    latitude: watch("latitude"),
                    longitude: watch("longitude"),
                  }}
                  onChange={({ location, latitude, longitude }) => {
                    setValue("location", location, { shouldValidate: true });
                    setValue("latitude", latitude, { shouldValidate: true });
                    setValue("longitude", longitude, {
                      shouldValidate: true,
                    });
                  }}
                />
                <input
                  type="hidden"
                  {...register("location", {
                    required: "Please pin the location on the map",
                  })}
                />
                <input
                  type="hidden"
                  {...register("latitude", {
                    required: "Please pin the location on the map",
                    validate: (v) =>
                      typeof v === "number" ||
                      "Please pin the location on the map",
                  })}
                />
                <input type="hidden" {...register("longitude")} />
                {errors.location && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="label"
                >
                  Image
                </label>
                <label
                  htmlFor="image"
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-pale-ink bg-soft-surface px-4 py-5 transition hover:border-blue"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card text-blue">
                    <Image size={18} strokeWidth={1.8} />
                  </span>
                  <span className="text-sm text-body">
                    {imagePreview
                      ? imageFile[0].name
                      : "Click to upload a photo of the item"}
                  </span>
                  <Upload
                    size={16}
                    strokeWidth={1.8}
                    className="ml-auto shrink-0 text-muted"
                  />
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image")}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 h-64 w-full rounded-lg border border-edge object-cover"
                  />
                )}
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-edge pt-5 mt-2">
                <NavLink
                  to="/lostit"
                  className="btn-secondary"
                >
                  Cancel
                </NavLink>
                {submitLoading ? (
                  <button
                    type="submit"
                    className="btn-primary w-full sm:w-auto opacity-70 cursor-wait"
                  >
                    Submitting...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-primary w-full sm:w-auto"
                  >
                    Submit item
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
};

export default CreateLostItem;

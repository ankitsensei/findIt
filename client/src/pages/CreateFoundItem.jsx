import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { Package, MapPin, Image, Upload } from "lucide-react";

const CreateFoundItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      description: "",
      location: "",
      image: "",
    },
  });

  const inputClass = (hasError) =>
    `w-full rounded-xl border py-2.5 pl-11 pr-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:ring-2 ${
      hasError
        ? "border-red-400 bg-red-50/30 focus:border-red-400 focus:ring-red-100"
        : "border-zinc-300 bg-white focus:border-zinc-900 focus:ring-zinc-200"
    }`;

  return (
    <div className="min-h-screen bg-zinc-50 pt-22 md:pt-26 pb-8 md:pb-12 px-4 md:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Found item
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
            Post what you found
          </h1>
          <p className="mt-2 text-sm md:text-base text-zinc-500">
            Help return a lost item to its owner by listing it here.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit(() => {})} noValidate>
            <div className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-zinc-700"
                >
                  Item name
                </label>
                <div className="relative">
                  <Package
                    size={16}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
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
                  className="mb-1.5 block text-sm font-medium text-zinc-700"
                >
                  Description
                </label>
                <div className="relative">
                  <textarea
                    id="description"
                    rows={4}
                    placeholder="Describe the item and where you found it..."
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
                  className="mb-1.5 block text-sm font-medium text-zinc-700"
                >
                  Location
                </label>
                <div className="relative">
                  <MapPin
                    size={16}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <input
                    id="location"
                    type="text"
                    placeholder="e.g. City park, Main Road"
                    className={inputClass(errors.location)}
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                </div>
                {errors.location && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="mb-1.5 block text-sm font-medium text-zinc-700"
                >
                  Image
                </label>
                <label
                  htmlFor="image"
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-5 transition hover:border-zinc-900"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500">
                    <Image size={18} strokeWidth={1.8} />
                  </span>
                  <span className="text-sm text-zinc-500">
                    Click to upload a photo of the item
                  </span>
                  <Upload
                    size={16}
                    strokeWidth={1.8}
                    className="ml-auto shrink-0 text-zinc-400"
                  />
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image")}
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-zinc-100 pt-5 mt-2">
                <NavLink
                  to="/foundit"
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:border-zinc-300"
                >
                  Cancel
                </NavLink>
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-xl bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.99] cursor-pointer"
                >
                  Submit item
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFoundItem;

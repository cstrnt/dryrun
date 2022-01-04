import { FormEvent } from "react";

export default function NewPage() {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const file = form[0] as HTMLInputElement;
    const description = form[1] as HTMLTextAreaElement;
    if (!file.files || !description.value) return;
    const formData = new FormData();
    formData.append("file", file.files[0]);
    formData.append("description", description.value);
    await fetch("/api/new", {
      method: "POST",
      body: formData,
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[300px] space-y-14"
    >
      <label>
        File:
        <input type="file" required className="block" />
      </label>
      <label>
        Description:
        <textarea required className="block" />
      </label>
      <button
        type="submit"
        className="rounded-md bg-orange-500 hover:bg-orange-600 text-white py-4"
      >
        Upload
      </button>
    </form>
  );
}

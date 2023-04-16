import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
const surprises = [
  {
    prompt:
      "Create an image of a serene mountain landscape with a waterfall cascading down the rocks.",
    category: "landscape",
    mood: "serene",
    location: "mountain",
    elements: ["waterfall", "rocks"],
    color_scheme: ["green", "blue"],
    style: "realistic",
  },
  {
    prompt:
      "Generate an image of a majestic lion standing on a rocky outcrop in the savannah.",
    category: "animals",
    mood: "majestic",
    location: "savannah",
    elements: ["lion", "rocky outcrop"],
    color_scheme: ["orange", "brown", "yellow"],
    style: "realistic",
  },
  {
    prompt:
      "Create an image of a futuristic city skyline at night with glowing neon lights.",
    category: "cityscape",
    mood: "futuristic",
    location: "city",
    elements: ["skyline", "neon lights"],
    color_scheme: ["blue", "purple", "pink"],
    style: "digital",
  },
  {
    prompt:
      "Generate an image of a spooky haunted mansion on a dark and stormy night.",
    category: "architecture",
    mood: "spooky",
    location: "mansion",
    elements: ["stormy night", "haunted"],
    color_scheme: ["black", "grey", "purple"],
    style: "illustrated",
  },
  {
    prompt:
      "Create an image of a beautiful underwater coral reef teeming with colorful fish and sea creatures.",
    category: "marine life",
    mood: "beautiful",
    location: "coral reef",
    elements: ["fish", "sea creatures"],
    color_scheme: ["blue", "green", "orange"],
    style: "realistic",
  },
  {
    prompt:
      "Generate an image of a cozy cabin in the woods with a warm fire burning in the fireplace.",
    category: "architecture",
    mood: "cozy",
    location: "cabin",
    elements: ["woods", "fireplace"],
    color_scheme: ["brown", "green", "red"],
    style: "realistic",
  },
  {
    prompt:
      "Create an image of a magical unicorn prancing through a field of flowers in the sunshine.",
    category: "fantasy",
    mood: "magical",
    location: "field",
    elements: ["unicorn", "flowers"],
    color_scheme: ["pink", "purple", "yellow"],
    style: "illustrated",
  },
];

export default function Post() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [surprize, setSurprize] = useState(false);
  const randomNumber = Math.floor(Math.random() * surprises.length);
 
  const getImage = () => {
    setLoading(true);
    if(surprize){
        setPrompt(surprises[randomNumber].prompt)
    }
    fetch("https://open-ai-project-server.vercel.app/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(!surprize ? { prompt: prompt } : {...surprises[randomNumber]}),
    })
      .then((response) => response.json()) // Read response as text
      .then((data) => {
        setImageUrl(data.image_url);
        setLoading(false);
      }); // Alert the response
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        getImage();
      }}
    >
      <div className="space-y-12">
        <div className=" pb-12">
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-x-6 gap-y-8 ">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-tr"
              >
                Put a best description of image to get a wonderful result.
              </label>
              <div className="mt-2">
                <div className="flex items-center flex-col gap-4 w-full  ">
                  <input
                  value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    type="text"
                    className="  bg-transparent px-4 border border-tr  py-3  text-tr w-full outline-none placeholder:text-tr sm:text-sm "
                    placeholder="INPUT TEXT TO GENERATE IMAGE"
                  />
                  <div className=" flex items-center gap-x-6">
                    <button
                      type="submit"
                      className="rounded-md bg-sr w-32  px-3 py-4 text-sm font-semibold text-white shadow-sm "
                    >
                      Generate
                    </button>
                    <button
                    onClick={()=>setSurprize(true)}
                      type="submit"
                      className="rounded-md bg-sr w-32  px-3 py-4 text-sm font-semibold text-white shadow-sm "
                    >
                      Surprise Me!
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-tr"
              >
                Generated Image
              </label>
              <div>
                <div className="mt-2 flex relative justify-center w-full min-h-[700px] rounded-lg border items-center border-dashed border-tr  ">
                  {imageUrl === null && !loading ? (
                    <div className="text-center h-full">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-tr"
                        aria-hidden="true"
                      />

                      <p className="text-xs leading-5 text-tr">
                        Your image will appear here.
                      </p>
                    </div>
                  ) : (
                    <img src={imageUrl} className="w-full h-full " alt="" />
                  )}
                  {loading && (
                    <div
                      className=" absolute z-20 w-full h-full flex-col flex items-center justify-center top-0 left-0 "
                      style={{ background: "rgba(0,0,0,0.8)" }}
                    >
                      <svg
                        class="animate-spin -ml-1 mr-3 h-10 w-10 text-tr"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <h6 className="text-tr text-2xl font-bold">
                        Generating Please Wait
                      </h6>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

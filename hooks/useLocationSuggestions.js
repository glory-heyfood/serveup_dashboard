
import useDebounce from "./useDebounce";
import { Loader } from "@googlemaps/js-api-loader";

const useLocationSuggestions = (onSuggestions) => {    
    const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    const searchFunc = async (input) => {
        if (!input || !input.length || !document) return;
        try {
            const placesLib = await loader.importLibrary("places");
            const service = new placesLib.AutocompleteService();
            const res = await new Promise((res, rej) => {
                service.getPlacePredictions(
                    {
                        input,
                        componentRestrictions: { country: "ng" },
                    },
                    (result) => res(result)
                );
            });

            const suggestions = res
                ? res.map((cand) => ({
                      address: cand.description,
                      googleMapsPlaceId: cand.place_id,
                      name: cand.structured_formatting.main_text,
                      description: cand.structured_formatting.secondary_text,
                  }))
                : [];

            if (typeof onSuggestions === "function") onSuggestions(suggestions);
        } catch (err) {
            console.log(err);
        }
    };

    const getDetails = async (placeId) => {
        if (!placeId || !document) return;
        try {
            const lib = await loader.importLibrary("places");
            const service = new lib.PlacesService(document.createElement("div"));
            const res = await new Promise((resolve, reject) => {
                service.getDetails(
                    {
                        placeId,
                        fields: ["geometry.location", "name", "place_id", "formatted_address"],
                    },
                    (result) => resolve(result)
                );
            });
            console.log("\n\n\nTHE LIB", res);
            return {
                address: res.formatted_address,
                latitude: res.geometry.location.lat(),
                longitude: res.geometry.location.lng(),
                coordinates: [res.geometry.location.lng(), res.geometry.location.lat()],
                googleMapsPlaceId: res.place_id,
                name: res.name,
            };
        } catch (err) {
            console.log(err);
        }
    };

    const getSuggestions = useDebounce(searchFunc, 0.8);

    return { getSuggestions, getDetails };
};

export default useLocationSuggestions;

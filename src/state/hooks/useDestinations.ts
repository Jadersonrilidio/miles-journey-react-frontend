import { useRecoilState, useRecoilValue } from "recoil";
import http from "../../http";
import APIResponseSchema from "../../interfaces/APIResponseSchema";
import IDestination from "../../interfaces/IDestination";
import { destinationState, destinationsState } from "../atom";
import { filteredDestinationsState } from "../selectors";
import { REACT_APP_BASE_URL } from "../../../globals";

const useDestinations = () => {
  const [destinations, setDestinations] = useRecoilState(destinationsState);
  const [destination, setDestination] = useRecoilState(destinationState);
  const filteredDestinations = useRecoilValue(filteredDestinationsState);

  const filterDestinations = (search: string): void => {
    http.get<APIResponseSchema<IDestination[]>>('/destinations', { params: { name: search } })
      .then(response => {
        if (response.data.data) {
          setDestinations(response.data.data.map(destination => {
            return {
              ...destination,
              photo_1: REACT_APP_BASE_URL + `/${destination.photo_1}`,
              photo_2: destination.photo_2 && REACT_APP_BASE_URL + `/${destination.photo_2}`,
            }
          }));
        }
      });
  };

  const getDestinationByUuid = (uuid: string): void => {
    const foundDestination = destinations.find(destination => destination.uuid == uuid);

    if (foundDestination) {
      return setDestination(foundDestination);
    }

    http.get<APIResponseSchema<IDestination>>(`/destinations/${uuid}`)
      .then(response => {
        if (response.data.data) {
          let loadedDestination = response.data.data;

          loadedDestination = {
            ...loadedDestination,
            photo_1: REACT_APP_BASE_URL + `/${loadedDestination.photo_1}`,
            photo_2: loadedDestination.photo_2 && REACT_APP_BASE_URL + `/${loadedDestination.photo_2}`,
          };

          setDestination(loadedDestination);
          setDestinations([...destinations, loadedDestination]);
        }
      });
  };

  return {
    destination,
    destinations: filteredDestinations,
    filterDestinations,
    getDestinationByUuid,
  }
};

export default useDestinations;

import { useRecoilState } from "recoil"
import { destinationsFilter } from "../atom"

const useDestinationFilter = () => {
  const [filter, setFilter] = useRecoilState(destinationsFilter);

  const applyFilter = (search: string) => {
    setFilter({
      search: search
    });
  };

  return {
    filter,
    applyFilter,
  };
};

export default useDestinationFilter;

import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useCabin } from "../cabins/useCabin";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { bookings, isLoading, numDays } = useRecentBookings();
  const { cabins, isLoading: isLoading3 } = useCabin();
  //eslint-disabled-next-line
  const {  isLoading: isLoading2, confirmedStays } = useRecentStays();
  if (isLoading || isLoading2 || isLoading3) return <Spinner />;

 
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinsCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart numDays={numDays} bookings={bookings} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

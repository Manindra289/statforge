
import GoodHabitSection from './GoodHabitSection'
import BadHabitSection from './BadHabitSection'
import Spinner from './Spinner';
import { Suspense } from 'react';

// const GoodHabitSection = lazy(() => import("./GoodHabitSection"));
// const BadHabitSection = lazy(() => import("./BadHabitSection"));

async function CombinedSection({userId}) {


      return (
    <>
    <Suspense fallback={<Spinner/>} >
      <GoodHabitSection color={"white"} userId={userId} />
    </Suspense>
    <Suspense fallback={<Spinner/>} >
      <BadHabitSection   userId={userId}  />
    </Suspense>
    </>

    )
  
}

export default CombinedSection
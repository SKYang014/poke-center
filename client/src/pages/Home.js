import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {

  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // Optional chaining negates the need to check if an object even exists before 
  // accessing its properties. In this case, no data will exist until the query 
  // to the server is finished.  if data exists, store it in the thoughts constant 
  // we just created. If data is undefined, then save an empty array to the 
  // thoughts component.
  const thoughts = data?.thoughts || [];
  console.log(thoughts)
  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (<div>Loading...</div>) :
            (<ThoughtList thoughts={thoughts}
              title='Some Feed for Thought(s)...' />
            )}
        </div>
      </div>
    </main>
  );
};

export default Home;

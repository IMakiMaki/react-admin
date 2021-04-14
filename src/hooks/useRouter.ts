import { useRef } from 'react';
import { useHistory } from 'react-router';

export const useRouter = () => {
  const history = useHistory();
  const historyRef = useRef<typeof history>();
  if (historyRef.current) {
    return historyRef.current;
  }
  return (historyRef.current = history);
};

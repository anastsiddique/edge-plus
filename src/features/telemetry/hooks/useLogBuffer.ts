import { useAtomValue } from 'jotai';
import { globalLogsAtom } from '../../../store/clusterStore';

export function useLogBuffer() {
    const logs = useAtomValue(globalLogsAtom);

    return [...logs].sort((a, b) => b.lastSeenTimestamp - a.lastSeenTimestamp);
}

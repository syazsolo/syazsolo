'use client';

import { useEffect, useMemo, useState } from 'react';

import { conversationsData } from '@/lib/chat/conversations';
import { useCurrentState } from '@/lib/chat/state';

const STORAGE_PREFIX = 'chat.progress.visited.';

const getStorageKey = (conversationId: string) =>
  `${STORAGE_PREFIX}${conversationId}`;

const loadVisited = (
  conversationId: string,
  validStates: Set<string>
): Set<string> => {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(getStorageKey(conversationId));
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    const filtered = parsed.filter(id => validStates.has(id));
    return new Set(filtered);
  } catch {
    return new Set();
  }
};

const saveVisited = (conversationId: string, visited: Set<string>) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      getStorageKey(conversationId),
      JSON.stringify(Array.from(visited))
    );
  } catch {
    // ignore storage errors
  }
};

export const useConversationProgress = (conversationId: string) => {
  const conversation = conversationsData[conversationId];
  const currentState = useCurrentState(conversationId);

  const allStates = useMemo(
    () => new Set(Object.keys(conversation?.states ?? {})),
    [conversation?.states]
  );
  const totalStates = allStates.size;

  const [visited, setVisited] = useState<Set<string>>(() =>
    loadVisited(conversationId, allStates)
  );

  useEffect(() => {
    // when conversation data changes (e.g., new states added), prune persisted visited
    setVisited(prev => {
      const next = new Set(Array.from(prev).filter(id => allStates.has(id)));
      if (next.size !== prev.size) saveVisited(conversationId, next);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, allStates]);

  useEffect(() => {
    if (!currentState) return;
    if (!allStates.has(currentState)) return;
    setVisited(prev => {
      if (prev.has(currentState)) return prev;
      const next = new Set(prev);
      next.add(currentState);
      saveVisited(conversationId, next);
      return next;
    });
  }, [currentState, allStates, conversationId]);

  const visitedCount = visited.size;
  const percent =
    totalStates === 0
      ? 0
      : Math.min(100, Math.round((visitedCount / totalStates) * 100));

  return { percent, visitedCount, totalStates };
};

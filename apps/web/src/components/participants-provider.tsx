import { trpc } from "@rallly/backend";
import { Participant, Vote, VoteType } from "@rallly/database";
import * as React from "react";

import { useRequiredContext } from "./use-required-context";

const ParticipantsContext = React.createContext<{
  participants: Array<Participant & { votes: Vote[] }>;
  getParticipants: (optionId: string, voteType: VoteType) => Participant[];
} | null>(null);

export const useParticipants = () => {
  return useRequiredContext(ParticipantsContext);
};

export const ParticipantsProvider: React.FunctionComponent<{
  children?: React.ReactNode;
  pollId: string;
}> = ({ children, pollId }) => {
  const { data: participants } = trpc.polls.participants.list.useQuery(
    {
      pollId,
    },
    {
      staleTime: 1000 * 10,
      cacheTime: Infinity,
    },
  );

  const getParticipants = (
    optionId: string,
    voteType: VoteType,
  ): Participant[] => {
    if (!participants) {
      return [];
    }
    return participants.filter((participant) => {
      return participant.votes.some((vote) => {
        return vote.optionId === optionId && vote.type === voteType;
      });
    });
  };

  // TODO (Luke Vella) [2022-05-18]: Add mutations here

  if (!participants) {
    return null;
  }

  return (
    <ParticipantsContext.Provider value={{ participants, getParticipants }}>
      {children}
    </ParticipantsContext.Provider>
  );
};

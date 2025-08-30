import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Avatar";
import { useEffect } from "react";
import {
  fetchParticipants,
  saveParticipantOrder,
  selectItem,
} from "../../features/slices/participantsReducer";
// Assuming you have an icon for active status or can use a simple div for a dot
// import { ActiveDotIcon } from "../../assets/icons";

export default function Participants() {
  // const spaceId = useSelector((state) => state.admin.currentSpace);
  // const { arr } = useSelector((state) => state.singlemenu);
  // console.log();
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const participants = useSelector((state) => state.participants);
  const spaceId = useSelector((state) => state.admin.currentSpace);

  useEffect(() => {
    // Fetch participants when component mounts
    dispatch(fetchParticipants(spaceId));
  }, [dispatch, spaceId]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (participants.length > 0) {
  //       // Dispatch saveParticipantOrder for each participant
  //       participants.forEach((participant) => {
  //         dispatch(
  //           saveParticipantOrder({
  //             spaceId,
  //             participantId: participant.id,
  //             selectItems: participant.selectedItems,
  //           })
  //         );
  //         dispatch(fetchParticipants(spaceId));
  //       });
  //     }
  //   }, 10000); // every 10 seconds

  //   // Cleanup on unmount
  //   return () => clearInterval(interval);
  // }, [participants, dispatch]);

  //

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-heading text-xl text-base-content">Participants</h2>

      {/* Participants List */}
      <div className="flex flex-col gap-3 overflow-y-auto max-h-60">
        {participants.length === 0 ? (
          <p className="text-sm text-gray-500">No participants yet.</p>
        ) : (
          participants.map((participant) => (
            <div
              key={participant.id}
              className="item flex justify-between w-full items-center"
            >
              <div className="flex items-center gap-3">
                <Avatar title={participant.name} />
                <span className="font-body text-base-content">{participant.name}</span>
              </div>
              {/* Placeholder for subtle status indicator (e.g., a colored dot) */}
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" title="Active"></div>
              {/* Replace with actual status logic when available */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

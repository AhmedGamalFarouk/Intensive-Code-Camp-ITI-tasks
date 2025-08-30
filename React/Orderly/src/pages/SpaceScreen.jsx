import { useEffect, useState } from "react";
import Container from "../components/Container";
import MySelection from "../components/spaceScreenInfo/MySelection";
import CollectiveOrder from "../components/spaceScreenInfo/CollectiveOrder";
import Participants from "../components/spaceScreenInfo/Participants";
import OrderSideInfo from "../components/spaceScreenInfo/OrderSideInfo";
import { useParams } from "react-router";
import { api } from "../Firebase/api_util.js";
import { setMenu, setUserId } from "../features/slices/singlemenu.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import UsernamePopup from "../components/userNamePopup.jsx";
import {
  addNewParticipant,
  fetchParticipants,
  listenToParticipants,
  saveParticipantOrder,
  updateParticipantOrderFromMenu,
} from "../features/slices/participantsReducer.js";
import { setCurrentSpace } from "../features/slices/adminReducer.js";

export default function SpaceScreen() {
  const { arr } = useSelector((state) => state.single);
  console.log("arrr", arr);

  const dispatch = useDispatch();
  const { spaceId } = useParams();
  const spaceLink = window.location.origin + "/space/" + spaceId;
  const [menu, setremoteMenu] = useState([]);
  const [guest, setGuest] = useState(null);
  const [showUsernamePopup, setShowUsernamePopup] = useState(false);
  const participants = useSelector((state) => state.participants);

  const menuItems = arr;
  const participantId = useSelector((state) => state.participants); // however you track the current participant

  // useEffect(() => {
  //   if (!participantId || menuItems.length === 0) return;

  //   // 1. Copy current menu to participant.selectedItems
  //   dispatch(updateParticipantOrderFromMenu({ participantId, menuItems }));

  //   // 2. Push to Firebase
  //   dispatch(
  //     saveParticipantOrder({
  //       spaceId,
  //       participantId,
  //       selectedItems: menuItems,
  //     })
  //   );
  // }, [menuItems, dispatch, participantId, spaceId]);

  useEffect(() => {
    if (spaceId) {
      const unsubscribe = dispatch(listenToParticipants(spaceId));

      return () => unsubscribe(); // 👈 cleanup listener on unmount
    }
    console.log("useeffect 1");
  }, [dispatch, spaceId]);
  // useEffect(() => {
  //   if (!spaceId) return;

  //   // Listen for changes to each participant's selectedItems
  //   Object.entries(participants).forEach(([participantId, participant]) => {
  //     const selectedItems = participant.selectedItems;

  //     // Watch `selectedItems`, and push changes to Firestore
  //     if (selectedItems && selectedItems.length > 0) {
  //       api.space
  //         .pushParticipantOrder(spaceId, participantId, selectedItems)
  //         .catch((err) => console.error("Failed to push selection:", err));
  //     }
  //   });
  // }, [spaceId, useSelector((state) => state.participants)]); // 👈 triggers on any participants state change
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (participants.length > 0) {
  //       // Dispatch saveParticipantOrder for each participant
  //       participants.forEach((participant) => {
  //         dispatch(
  //           saveParticipantOrder({
  //             spaceId,
  //             participantId: participant.id,
  //             selectItems: arr,
  //           })
  //         );
  //         dispatch(fetchParticipants(spaceId));
  //       });
  //     }
  //   }, 10000); // every 10 seconds

  //   // Cleanup on unmount
  //   return () => clearInterval(interval);
  // }, [participants, dispatch, spaceId, arr]);

  useEffect(() => {
    const cameFromInside = sessionStorage.getItem("internal-nav");

    if (cameFromInside === "true") {
      console.log("✅ Came from inside the app");
      // sessionStorage.removeItem("internal-nav"); // optional cleanup
    } else {
      console.log("❌ Came directly (e.g. bookmark, reload, external link)");
      setShowUsernamePopup(true); // or whatever logic
    }
    console.log("useeffect 2");
  }, []);

  const handleGuestSubmit = async (name) => {
    const joinedAt = new Date().toISOString();
    const newGuest = { name, joinedAt };
    setGuest(newGuest);
    setShowUsernamePopup(false);

    // Check for duplicate before dispatching
    const alreadyExists = participants.some(
      (p) => p.name === name && p.spaceId === spaceId
    );

    if (!alreadyExists) {
      dispatch(addNewParticipant({ name, spaceId }));
    } else {
      console.log("Participant already exists, skipping add.");
    }
  };

  useEffect(() => {
    api.space.getMenuItems(spaceId).then((res) => {
      console.log("res is ", res);
      setremoteMenu(res);
      dispatch(setCurrentSpace(spaceId));
    });
  }, [spaceId, dispatch]);

  useEffect(() => {
    console.log("menu is ", menu);
    menu.forEach((m) => {
      // console.log(""m.name, m.price);
      if (arr.length === 0) {
        dispatch(setMenu({ name: m.name, price: m.price }));
      }
    });
  }, [menu, dispatch, arr.length]);

  return (
    <Container>
      <UsernamePopup
        isOpen={showUsernamePopup}
        onClose={() => setShowUsernamePopup(false)}
        onSubmit={handleGuestSubmit}
      />
      <section className="grid grid-cols-1 lg:grid-cols-6 gap-6 my-10">
        {/* Participants Column */}
        <div className="lg:col-span-6 bg-base-100 p-6 rounded-xl shadow-sm flex flex-col gap-6">
          <div
            className="bg-base-200 p-4 rounded-xl shadow-sm cursor-pointer"
            onClick={() => {
              navigator.clipboard
                .writeText(spaceLink)
                .then(() => {
                  Swal.fire({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: "success",
                    title: "Room ID copied to clipboard!",
                  });
                })
                .catch((err) => console.error("Failed to copy: ", err));
            }}
          >
            <h2 className="font-heading text-lg text-primary">
              Space ID: <span className="font-body font-normal text-base-content">{spaceId}</span>
            </h2>
            <p className="text-sm text-neutral">Click to copy</p>
          </div>
          <Participants />
        </div>


        {/* My Selection & Collective Order Column */}
        <div className="lg:col-span-6 bg-base-100 p-6 rounded-xl shadow-sm flex flex-col gap-6">
          <MySelection />
          <CollectiveOrder />
          <OrderSideInfo />
        </div>
      </section>
    </Container>
  );
}

import NoteForm from "../components/NoteForm";
import { NoteData, Tag } from "../App";

type NewNoteFormProp = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteFormProp) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}

export default NewNote;

import NoteForm from "../components/NoteForm";
import { NoteData, Tag } from "../App";
import { useNote } from "../components/NoteLayout";

type EditNoteFormProp = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteFormProp) {
  const note = useNote();
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}

export default EditNote;

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNotes from "./pages/NewNote";
import { useLocalStorage } from "./useLocalStorageHook";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import NoteList from "./pages/NoteList";
import NoteLayout from "./components/NoteLayout";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";

export type Note = {
  id: string;
} & NoteData;

export type RowNote = {
  id: string;
} & RowNoteData;

export type RowNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RowNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }
  function addTag(tag: Tag) {
    setTags((prev) => {
      return [...prev, tag];
    });
  }
  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else return note;
      });
    });
  }
  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  function updateTag(id: string, label:string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return {...tag, label}
        } else return tag
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }
  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList availableTags={tags} notes={notesWithTags} updateTag={updateTag} deleteTag={deleteTag} />}
        />
        <Route
          path="/new"
          element={
            <NewNotes
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDeleteNote={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                availableTags={tags}
                onSubmit={onUpdateNote}
                onAddTag={addTag}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;

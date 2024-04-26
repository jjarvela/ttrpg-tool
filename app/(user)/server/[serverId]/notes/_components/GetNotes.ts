interface NoteData {
  name: string | null | undefined;
  author: string;
  documentName: string;
  appId: string;
  token: string;
  position: {
    x: number;
    y: number;
  };
}

export async function getData() {
  try {
    const res = await fetch("/api/tiptap", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    // Set default position for notes without position data
    const notesWithPosition = data.map((note: NoteData) => ({
      ...note,
      position: note.position || { x: 0, y: 0 },
    }));

    return notesWithPosition;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw new Error("Failed to fetch data");
  }
}

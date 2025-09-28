<template>
  <div class="basic-text-editor">
    <div v-if="editor" class="editor-toolbar">
      <button
        :class="{ active: editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <Icon name="material-symbols:format-bold-rounded" />
      </button>
      <button
        :class="{ active: editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <Icon name="material-symbols:format-italic-rounded" />
      </button>
      <button
        :class="{ active: editor.isActive('underline') }"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <Icon name="material-symbols:format-underlined-rounded" />
      </button>
      <button
        :class="{ active: editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <Icon name="material-symbols:format-strikethrough" />
      </button>

      <button
        :class="{ active: editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <Icon name="material-symbols:format-list-bulleted-rounded" />
      </button>
      <button
        :class="{ active: editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <Icon name="material-symbols:format-list-numbered-rounded" />
      </button>

      <button @click="editor.chain().focus().setHorizontalRule().run()">
        <Icon name="material-symbols:horizontal-rule-rounded" />
      </button>

      <button @click="editor.chain().focus().undo().run()">
        <Icon name="material-symbols:undo-rounded" />
      </button>
      <button @click="editor.chain().focus().redo().run()">
        <Icon name="material-symbols:redo-rounded" />
      </button>
    </div>

    <div class="editor-wrapper" @click="editor?.chain().focus().run()">
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";

const props = defineProps<{
  value: string;
}>();

const emits = defineEmits<{
  (e: "input", value: string): void;
}>();

const editor = useEditor({
  content: props.value || "",
  extensions: [
    StarterKit,
    BulletList.configure({
      HTMLAttributes: { class: "list-disc ml-4" },
    }),
    OrderedList.configure({
      HTMLAttributes: { class: "list-decimal ml-4" },
    }),
    Underline,
    ListItem,
  ],
  onUpdate: ({ editor }) => {
    emits("input", editor.getHTML());
  },
});
</script>

<style scoped lang="scss">
.basic-text-editor {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 2px solid rgba($color-primary-800, 0.1);
  border-radius: 10px;
  transition: border 200ms;

  &:focus-within {
    border: 2px solid rgba($color-primary-400, 1);
  }

  .editor-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 8px;
    border-bottom: 1px solid rgba($color-primary-800, 0.1);
    background-color: $color-gray-50;
    // background-color: white;

    button {
      height: 28px;
      width: 28px;
      cursor: pointer;
      border-radius: 8px;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.active {
        background-color: rgba($color-primary-300, 0.1);
        color: $color-primary-500;
      }

      &:hover {
        background-color: rgba($color-primary-300, 0.1);
      }
    }
  }

  .editor-wrapper {
    cursor: text;
    padding: 8px;
    min-height: 150px;
    background: #fff;
    font-weight: 500;
    color: $color-gray-600;
    font-size: 14px;
    line-height: 20px;

    :deep(.ProseMirror) {
      outline: none;
    }
  }
}
</style>

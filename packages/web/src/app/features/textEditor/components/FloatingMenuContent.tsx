import { Button } from '@nextui-org/react'
import { Icon, Text } from '@shared/components'
import { RxHeading } from 'react-icons/rx'
import { MdSubtitles, MdFormatListBulletedAdd } from 'react-icons/md'
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4 } from 'react-icons/lu'
import { IToolbarEditor } from './ToolbarEditorHeader'
import { removeLeadingSlash } from '../Identations'

export function FloatingMenuContent({ editor }: IToolbarEditor) {
  return (
    <>
      <span>
        <Button
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 1 }).toggleBold().run()
            removeLeadingSlash(editor)
          }}
          variant="light"
          color="secondary"
          size="lg"
          data-active={editor.isActive('heading', { level: 1 })}
          className="flex w-full backdrop-blur-2xl data-[active=true]:bg-primary"
          radius="none"
        >
          <div className="flex items-center justify-center bg-white rounded-sm size-8">
            <Icon icon={RxHeading} color="black" size="lg" />
          </div>
          <div className="flex flex-col justify-start items-start flex-1">
            <Text as="b" weight="bold" color="white" text="Título" />
            <Text as="small" weight="light" color="gray" text="Aplicar seção de título" />
          </div>
        </Button>
      </span>

      <span>
        <Button
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 6 }).toggleBold().toggleItalic().run()
            removeLeadingSlash(editor)
          }}
          variant="light"
          color="secondary"
          size="lg"
          data-active={editor.isActive('heading', { level: 6 })}
          className="flex w-full backdrop-blur-2xl data-[active=true]:bg-primary"
          radius="none"
        >
          <div className="flex items-center justify-center bg-white rounded-sm size-8">
            <Icon icon={MdSubtitles} color="black" size="lg" />
          </div>
          <div className="flex flex-col justify-start items-start flex-1">
            <Text as="b" weight="bold" color="white" text="Subtítulo" />
            <Text as="small" weight="light" color="gray" text="Aplicar seção de subtítulo" />
          </div>
        </Button>
      </span>

      <span>
        <Button
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).toggleBold().run()
            removeLeadingSlash(editor)
          }}
          variant="light"
          color="secondary"
          size="lg"
          data-active={editor.isActive('heading', { level: 2 })}
          className="flex w-full backdrop-blur-2xl data-[active=true]:bg-primary"
          radius="none"
        >
          <div className="flex items-center justify-center bg-white rounded-sm size-8">
            <Icon icon={LuHeading1} color="black" size="lg" />
          </div>
          <div className="flex flex-col justify-start items-start flex-1">
            <Text as="b" weight="bold" color="white" text="Título 1" />
            <Text as="small" weight="light" color="gray" text="Aplicar seção de título 1" />
          </div>
        </Button>
      </span>

      <span>
        <Button
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 3 }).toggleBold().run()
            removeLeadingSlash(editor)
          }}
          variant="light"
          color="secondary"
          size="lg"
          data-active={editor.isActive('heading', { level: 3 })}
          className="flex w-full backdrop-blur-2xl data-[active=true]:bg-primary"
          radius="none"
        >
          <div className="flex items-center justify-center bg-white rounded-sm size-8">
            <Icon icon={LuHeading2} color="black" size="lg" />
          </div>
          <div className="flex flex-col justify-start items-start flex-1">
            <Text as="b" weight="bold" color="white" text="Título 2" />
            <Text as="small" weight="light" color="gray" text="Aplicar seção de título 2" />
          </div>
        </Button>
      </span>

      <span>
        <Button
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 4 }).toggleBold().run()
            removeLeadingSlash(editor)
          }}
          variant="light"
          color="secondary"
          size="lg"
          data-active={editor.isActive('heading', { level: 4 })}
          className="flex w-full backdrop-blur-2xl data-[active=true]:bg-primary"
          radius="none"
        >
          <div className="flex items-center justify-center bg-white rounded-sm size-8">
            <Icon icon={LuHeading3} color="black" size="lg" />
          </div>
          <div className="flex flex-col justify-start items-start flex-1">
            <Text as="b" weight="bold" color="white" text="Título 3" />
            <Text as="small" weight="light" color="gray" text="Aplicar seção de título 3" />
          </div>
        </Button>
      </span>

      <span>
        <Button
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 5 }).toggleBold().run()
            removeLeadingSlash(editor)
          }}
          variant="light"
          color="secondary"
          size="lg"
          data-active={editor.isActive('heading', { level: 5 })}
          className="flex w-full backdrop-blur-2xl data-[active=true]:bg-primary"
          radius="none"
        >
          <div className="flex items-center justify-center bg-white rounded-sm size-8">
            <Icon icon={LuHeading4} color="black" size="lg" />
          </div>
          <div className="flex flex-col justify-start items-start flex-1">
            <Text as="b" weight="bold" color="white" text="Título 4" />
            <Text as="small" weight="light" color="gray" text="Aplicar seção de título 4" />
          </div>
        </Button>
      </span>

      <span>
        <Button
          onClick={() => {
            editor.chain().focus().toggleBulletList().run()
            removeLeadingSlash(editor)
          }}
          variant="light"
          data-active={editor.isActive('bulletList')}
          color="secondary"
          size="lg"
          className="flex w-full backdrop-blur-2xl data-[active=true]:bg-primary"
          radius="none"
        >
          <div className="flex items-center justify-center bg-white rounded-sm size-8">
            <Icon icon={MdFormatListBulletedAdd} color="black" size="lg" />
          </div>
          <div className="flex flex-col justify-start items-start flex-1">
            <Text as="b" weight="bold" color="white" text="Lista com marcadores" />
            <Text as="small" weight="light" color="gray" text="Aplicar marcador" />
          </div>
        </Button>
      </span>
    </>
  )
}
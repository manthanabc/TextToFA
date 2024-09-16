<script>
  import * as Menubar from "$lib/components/ui/menubar/index.js"
  
	let bookmarks =""
	let fullUrls =""
	
</script>

<div>
	<!-- MENUBAR -->
	<Menubar.Root class="backdrop-blur bg-cardBackground/80 black/20 w-full absolute border-none shadow-[0px_0px_12px_1px_black]">
	  <Menubar.Menu >
	    <Menubar.Trigger>File</Menubar.Trigger>
	    <Menubar.Content>
	      <Menubar.Item >
	        New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
	      </Menubar.Item>
	      <Menubar.Item>
	        New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
	      </Menubar.Item>
	      <Menubar.Item>New Incognito Window</Menubar.Item>
	      <Menubar.Separator />
	      <Menubar.Sub>
	        <Menubar.SubTrigger>Share</Menubar.SubTrigger>
	        <Menubar.SubContent>
	          <Menubar.Item>Email link</Menubar.Item>
	          <Menubar.Item>Messages</Menubar.Item>
	          <Menubar.Item>Notes</Menubar.Item>
	        </Menubar.SubContent>
	      </Menubar.Sub>
	      <Menubar.Separator />
	      <Menubar.Item>
	        Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
	      </Menubar.Item>
	    </Menubar.Content>
	  </Menubar.Menu>
	  <Menubar.Menu>
	    <Menubar.Trigger>Edit</Menubar.Trigger>
	    <Menubar.Content>
	      <Menubar.Item>
	        Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
	      </Menubar.Item>
	      <Menubar.Item>
	        Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
	      </Menubar.Item>
	      <Menubar.Item>Cut</Menubar.Item>
	      <Menubar.Item>Copy</Menubar.Item>
	      <Menubar.Item>Paste</Menubar.Item>
	    </Menubar.Content>
	  </Menubar.Menu>
	  <Menubar.Menu>
	    <Menubar.Trigger>View</Menubar.Trigger>
	    <Menubar.Content>
	      <Menubar.CheckboxItem bind:checked={bookmarks}
	        >Always Show Bookmarks Bar</Menubar.CheckboxItem
	      >
	      <Menubar.CheckboxItem bind:checked={fullUrls}>
	        Always Show Full URLs
	      </Menubar.CheckboxItem>
	      <Menubar.Separator />
	      <Menubar.Item inset>
	        Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
	      </Menubar.Item>
	      <Menubar.Item inset>
	        Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
	      </Menubar.Item>
	      <Menubar.Separator />
	      <Menubar.Item inset>Toggle Fullscreen</Menubar.Item>
	      <Menubar.Separator />
	      <Menubar.Item inset>Hide Sidebar</Menubar.Item>
	    </Menubar.Content>
	  </Menubar.Menu>
	</Menubar.Root>
</div>

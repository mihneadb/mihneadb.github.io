---
layout: post
title: "Vim cheatsheet"
date: "Thu Sep 19 19:08:47 +0300 2013"
---

By popular demand, I wrote up a short cheatsheet for the keybindings
I use the most in Vim.

I will keep adding to the list as I realize I use something
more often or when I remember something that I use without realizing. Feel free
to post your suggestions in the comment section.

Action | Key(s)
- | -
insert at cursor position | i
insert after the cursor | a
insert at the beginning of the line | I
insert at the end of the line | A
find *SOMETHING* | /*SOMETHING* (that's a forward slash)
go to next found match | n
go to previous found match | N
jump to beginning of the next word | w
jump to the beginning of the current/previous word | b
jump to the end of the current/next word | e
copy selection | y (having something selected)
copy current line | Y
cut selection | d (having something selected)
cut current line | dd
paste after the cursor | p
paste before the cursor | P
enter visual selection mode | v
enter visual line selection mode | V
insert empty line after the current one | o
insert empty line before the current one | O
erase (cut) character under cursor | x
erase (cut) character before cursor | x
delete from cursor to end of word | dw
delete line (same as cut) | dd
delete from cursor to end of line | d$
delete from cursor to beginning of line | d^
change from cursor to end of word | cw
change character under cursor | s
increment number under cursor (by 1) | Ctrl + A
decrement number under cursor (by 1) | Ctrl + X
go to line *N* | :*N*
end of line | $
beginning of line | ^
end of file | G
beginning of file | gg
navigate back to previous location | Ctrl + o
open a [new] file (buffer) | :e
save current buffer | :w
undo | u
redo | :redo (Ctrl + R by default but I remapped that)
switch between current and previous buffer | Ctrl + 6
comment current line / selection | *leader* + / (Bound to [NERDCommenter](https://github.com/scrooloose/nerdcommenter)'s toggle function)
open a file in the project/directory (fuzzy search) | Ctrl + P (using [CtrlP](https://github.com/kien/ctrlp.vim))
go to symbol in currently open buffers | Ctrl + R (Bound to [CtrlP](https://github.com/kien/ctrlp.vim)'s CtrlPBufTagAll)
view symbols list in current buffer | F8 (Using [TagBar](https://github.com/majutsushi/tagbar)'s toggle)
view directory/project layout | *leader* + n (Using [NERDTree](https://github.com/scrooloose/nerdtree))
view currently open buffers | *leader* + b (Using [EasyBuffer](https://github.com/troydm/easybuffer.vim)'s toggle)
record macro in register R | qR then *actions* then Esc then q
playback macro in register R | @R

Keep in mind that most of the actions can be used together (for example *d* and
*w*, for *dw*) and they can also be repeated if you prefix the command with a
number that specifies the repetition count for the given command.

You can find out what *leader* is
[here](http://stackoverflow.com/questions/1764263/what-is-the-leader-in-a-vimrc-file).
Stay tuned for a post on configuring Vim (especially for beginners / converts).


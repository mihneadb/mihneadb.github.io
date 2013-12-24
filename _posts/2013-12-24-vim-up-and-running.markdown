---
layout: post
title: "Vim - up and running"
date: "Tue Dec 24 11:12:21 +0200 2013"
---

So you've been using Vim for a while but you feel that you are missing some of
the features of modern, hip editors. Or maybe you never used Vim but you're
curious to try it out. Either way, this guide will help you get started and
by the time we're done you'll have a complete development environment that is
accessible anywhere through SSH, quick to start and with a small footprint.

####Installing Vim

You need a version of Vim that's at least 7.4. It should also be a full version,
not the minimal kind of Vim that Ubuntu ships with by default.

Speaking of Ubuntu, its repos are outdated right now so you should use a PPA
like [this](https://launchpad.net/~nmi/+archive/vim-snapshots) one. You can
use [homebrew](http://brew.sh/) to install MacVim on OS X. I haven't done this
on Windows so you'll have to look into it yourself.

####Vim Package Management

I feel that one of the most useful features Linux distros have is the package
manager. It allows you to easily look for and install packages that enhance
the core functionality of your software. Editors like Sublime Text have this as
well with the help of plugins. Guess what, there are package management plugins
for Vim too.

We'll be using [Vundle](https://github.com/gmarik/vundle). To install it,
run this command (you'll need `git`):

    git clone https://github.com/gmarik/vundle.git ~/.vim/bundle/vundle

Now that you have Vundle, I suggest having a config file to store the
list of packages you want to use. This will
become helpful when you want
to duplicate the same Vim setup somewhere else.

<script src="https://gist.github.com/mihneadb/8111150.js"></script>

Make sure you include it into your `.vimrc` file. You can prepend
"`source ~/.bundles.vim`" to your `.vimrc` file and all should be well.

After we set up the bundles file, we can install and/or update all the packages
in there using this command:

    vim -u ~/.bundles.vim +BundleInstall! +q

I usually have an `upvim` alias for it.

####Packages

Let me share a list of packages that I find useful in my Vim setup. You can
install all of them using Vundle. I usually keep them in my `.bundles.vim` file
and just run the `upvim` alias whenever I change something.

#####CtrlP

`Bundle 'kien/ctrlp.vim'` [link](https://github.com/kien/ctrlp.vim)

Provides fuzzy file and symbol matching, similar to what TextMate and Sublime
Text have. Really fast.


#####vim-bad-whitespace

`Bundle 'bitc/vim-bad-whitespace'` [link](https://github.com/bitc/vim-bad-whitespace)

Highlights trailing whitespace.


#####detectindent

`Bundle 'ciaranm/detectindent'` [link](https://github.com/ciaranm/detectindent)

Automatically detects indent settings from files.


#####NERD Commenter

`Bundle 'scrooloose/nerdcommenter'` [link](https://github.com/scrooloose/nerdcommenter)

Really easy commenting/uncommenting.


#####NERD Tree

`Bundle 'scrooloose/nerdtree'` [link](https://github.com/scrooloose/nerdtree)

Project explorer functionality.


#####Syntastic

`Bundle 'scrooloose/syntastic'` [link](https://github.com/scrooloose/syntastic)

Syntax checks, linting.


#####Tagbar

`Bundle 'majutsushi/tagbar'` [link](https://github.com/majutsushi/tagbar)

Displays a sidebar with the symbols in the current file (functions, classes etc.)


#####Easybuffer

`Bundle 'troydm/easybuffer.vim'` [link](https://github.com/troydm/easybuffer.vim)

Easy way to see and switch between open buffers (files).


#####Zenburn

`Bundle 'jnurmine/Zenburn'` [link](https://github.com/jnurmine/Zenburn)

The Zenburn color scheme.


#####Ack.vim

`Bundle 'mileszs/ack.vim'` [link](https://github.com/mileszs/ack.vim)

Friendly way of using [ack](http://search.cpan.org/~petdance/ack/ack) from
within Vim. You need `ack` installed to use this.


#####Vim-powerline

`Bundle 'Lokaltog/vim-powerline'` [link](https://github.com/Lokaltog/vim-powerline)

Smart statusline.


#####Gundo

`Bundle 'Gundo'` [link](http://www.vim.org/scripts/script.php?script_id=3304)

Helps you use the undo tree Vim provides.


#####YouCompleteMe

`Bundle 'Valloric/YouCompleteMe'` [link](https://github.com/Valloric/YouCompleteMe)

Smart, fast, fuzzy autocompletion engine for Vim. Please check the docs, after
installing it with Vundle there are some extra-steps to do.


#####Tern for Vim

`Bundle 'marijnh/tern_for_vim'` [link](https://github.com/marijnh/tern_for_vim)

Great autocompletion + "intellisense" support for JS. Please check the docs, after
installing it with Vundle there are some extra-steps to do.


Here's my `.bundles.vim`:

<script src="https://gist.github.com/mihneadb/8111728.js"></script>


####Extra tweaks

All the packages we talked about have great intro pages and documentation, but
maybe you don't want to spend so much time on everything. I suggest starting
off with my
[vimrc](https://github.com/mihneadb/configs/blob/master/vimrc) and change what
doesn't fit your preference.

However, there are some settings that I find  really useful and I'd like to mention
here.

First, you can use Vim's `cc` functionality to display a column in order to keep
your line length in check. I use `set cc=80`.

You can use Zenburn as your color scheme with `colors zenburn`.

By default, `CtrlP` changes your cwd when selecting a new file. You can change
this behavior with `let g:ctrlp_working_path_mode = ''`. Also, I want it to
search both among open buffers and files on the HDD, which is why I use
`let g:ctrlp_cmd = 'CtrlPMixed'`. Finally, I really like Sublime's go to symbol
keybinding (CTRL+R), so I also use `map <C-R> :CtrlPBufTagAll<CR>`.

If you choose to install DetectIndent, you need to turn it on:

    " first two lines are up to you
    let g:detectindent_preferred_expandtab = 1
    let g:detectindent_preferred_indent = 4
    autocmd BufNewFile,BufReadPost * :DetectIndent
    autocmd FileType make setlocal noexpandtab

I bound my *leader* key to comma: `let mapleader = ","`. This is useful for me
in the NERD Commenter and NERD Tree keybindings:

    map <leader>/ <plug>NERDCommenterToggle
    imap <leader>/ <Esc><plug>NERDCommenterTogglei

    map <leader>n :NERDTreeToggle<CR>
    nmap <leader>m :NERDTreeFind<CR>

NERD Commenter lets you comment/uncomment parts of your code and it's compatible
with Vim's selection modes. NERD Tree's find functionality helps you locate
the current file in the project's tree.

I use `F8` to toggle TagBar and bring it in focus:

    nmap <F8> :TagbarToggle<CR>
    let g:tagbar_autofocus = 1


Last but not least, you might want to check out the
[Vim Cheatsheet](http://www.mihneadb.net/post/vim-cheatsheet/) I wrote some
time ago.


Good luck!

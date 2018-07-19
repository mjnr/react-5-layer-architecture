#!/usr/bin/env bash

createIndex () {
	filepath=$1
	folderpath="/app/enhancers/$filepath"
	fullpath="/app/enhancers/$filepath/index.js"
	content="import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';

export default compose(
	setDisplayName('$fullpath')
)"
	mkdir -p "$(pwd)$folderpath"
  echo "$content" > "$(pwd)$fullpath"
}

createHandlers () {
	filepath=$1
	folderpath="/app/enhancers/$filepath"
	fullpath="/app/enhancers/$filepath/handlers.js"
	content="import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import withHandlers from 'recompose/withHandlers';

export default compose(
	setDisplayName('$fullpath'),
	withHandlers({

	})
)"
	mkdir -p "$(pwd)$folderpath"
  echo "$content" > "$(pwd)$fullpath"
}

createHooks () {
	filepath=$1
	folderpath="/app/enhancers/$filepath"
	fullpath="/app/enhancers/$filepath/hooks.js"
	content="import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import lifecycle from 'recompose/lifecycle';

export default compose(
	setDisplayName('$fullpath'),
	lifecycle({

	})
)"
	mkdir -p "$(pwd)$folderpath"
  echo "$content" > "$(pwd)$fullpath"
}

createData () {
	filepath=$1
	folderpath="/app/enhancers/$filepath"
	fullpath="/app/enhancers/$filepath/data.js"
	content="import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import { connect } from 'react-redux';

export default compose(
	setDisplayName('$fullpath'),
	connect()
)"
	mkdir -p "$(pwd)$folderpath"
  echo "$content" > "$(pwd)$fullpath"
}

createState () {
	filepath=$1
	folderpath="/app/enhancers/$filepath"
	fullpath="/app/enhancers/$filepath/state.js"
	content="import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import withState from 'recompose/withState';

export default compose(
	setDisplayName('$fullpath'),
	withState()
)"
	mkdir -p "$(pwd)$folderpath"
  echo "$content" > "$(pwd)$fullpath"
}

createPropsMapper () {
	filepath=$1
	folderpath="/app/enhancers/$filepath"
	fullpath="/app/enhancers/$filepath/propsMapper.js"
	content="import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import withProps from 'recompose/withProps';

export default compose(
	setDisplayName('$fullpath'),
	withProps()
)"
	mkdir -p "$(pwd)$folderpath"
  echo "$content" > "$(pwd)$fullpath"
}

createEnhancer () {
	filepath=$1
	folderpath="/app/enhancers/$filepath"
	fullpath="/app/enhancers/$filepath/index.js"
	content="import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import data from './data';
import state from './state';
import handlers from './handlers';
import hooks from './hooks';
import propsMapper from './propsMapper';

export default compose(
	setDisplayName('$fullpath'),
	data,
	state,
	handlers,
	hooks,
	propsMapper
)"
	mkdir -p "$(pwd)$folderpath"
  echo "$content" > "$(pwd)$fullpath"
}

createDumb () {
	filepath=$1
	folderpath="/app/components/$filepath"
	fullpath="/app/components/$filepath/index.js"
	content="const $filepath = () => {
	return (
		<div>
		</div>
	)
};

export default $filepath;"
	mkdir -p "$(pwd)$folderpath"
  echo "$content" > "$(pwd)$fullpath"
}

case "$1" in
index)
  createIndex $2
;;
handlers)
  createHandlers $2
;;
hooks)
  createHooks $2
;;
data)
  createData $2
;;
state)
  createState $2
;;
propsMapper)
  createPropsMapper $2
;;
dumb)
  createDumb $2
;;
enhancer)
	createEnhancer $2
	createHandlers $2
	createHooks $2
	createData $2
	createState $2
	createPropsMapper $2
;;
esac

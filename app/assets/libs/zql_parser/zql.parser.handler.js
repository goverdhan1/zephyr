zqlParserHandler = (function() {

//===============================================
//        PUBLIC METHODS (start)
//===============================================

	var myoptions = null ;

	/** zqlMeta is metadata for one entity
	 *  userPos: index where user's cursor is present
	 */
	function doParse(input, zqlMeta, userPos) {
		// console.log("start of parsing: userPos: " + userPos + " len: " + input.length + " input: [" + input + "]");

		// tokenArray is where parsed tokens are attached
		myoptions = {zqlMeta: zqlMeta, tokenArray: new Array(), userPos: userPos} ;

		// during parsing many attributes are added to myoptions

		try {
			var result = zqlParser.parse(input, myoptions);
			findUsersCurrentToken(input, null);
			// printOptions();
			return new ParseResponse(result, null) ;
		} catch (e) {
			// Syntax error
			printSyntaxError(e);
			findUsersCurrentToken(input, e);
			// printOptions();
			return new ParseResponse(result, e) ;
		}
	}

	function ParseResponse(result, syntaxError) {
		this.myoptions = myoptions ;

		// user is at this position
		// myoptions.userPos ;

		// user is currently at this token
		// myoptions.lastToken ;

		// (optional) if user is after lastToken and due to error, token is not generated.
		// handler generates a partial pseudo-token
		// myoptions.partialToken ;

		// array of possible values which user can choose. E.g. attribute names or operator names
		// values which need to be looked up e.g. release name, etc are populated from outside.
		// they are not shown. In that case userChoices is null
		// myoptions.userChoices ;

		// available if query is successfully parsed and validated
		this.result = result ;

		// this is useful inside zqlParser for validation. Not used here.
		// not useful outside here.
		// myoptions.currentZqlField ;
		// myoptions.currentOp ; // helps in determining in operator

		// if available, there is an error
		this.syntaxError = syntaxError ;

		this.name = "ParseResponse" ;
	}

//===============================================
//        PUBLIC METHODS (end)
//===============================================

//===============================================
//        DEBUG LOGIC (start)
//===============================================

	function printSyntaxError(syntaxError) {
		if (!syntaxError) {
			// console.log("There is no syntaxError. ");
			return ;
		}
		// console.log(syntaxError.message) ;
		// console.log(syntaxError.expected) ;
		// console.log(syntaxError.found) ;
		// console.log(syntaxError.offset) ;
		// console.log(syntaxError.line) ;
		// console.log(syntaxError.column) ;
	}

	function printOptions() {
		if (myoptions.userChoices) {
			// console.log("userChoices: " + myoptions.userChoices);
		} else {
			// console.log("no choices are present");
		}

		// console.log("userChoice: lookupField: " + myoptions.lookupField);
		// console.log("userChoice: lookupValue: " + myoptions.lookupValue);
		// console.log("userChoice: lookupValue: " + tokenAsString(myoptions.lookupToken));
	}

	function printToken(token) {
		// // console.log(tokenAsString(token));
	}

	function tokenAsString(token) {
		if (token)
			return " token: " + token.type + " pos: " + token.pos + " len: " + token.len + " val: [" + token.value + "]" ;
		else
			return " token: is null" ;
	}

//===============================================
//        DEBUG LOGIC (end)
//===============================================

//===============================================
//        FIND TOKENS (start)
//===============================================

	function findTokenByPosition(array, pos) {
		var lastToken = null ;
		for (var i = 0; i < array.length; i++) {
			var token = array[i] ;
			printToken(token);
			if (token.pos <= pos) {
				lastToken = token ;
			} else {
				break ;	// we know user is at which token.
			}
		}
		return lastToken ;
	}

	// if partial token exists populates myoptions.partialToken.
	// else clears it.
	function findPartialToken(array, pos, input) {
		myoptions.partialToken = null ;
		var lastToken = findTokenByPosition(array, pos) ;
		if (lastToken && (lastToken.pos + lastToken.len) < pos) {
			// // console.log("user is after: " + tokenAsString(lastToken));

			var startIdx = lastToken.pos + lastToken.len ;
			var chunk = input.substr(startIdx, pos) ;
			// // console.log("chunk: [" + chunk + "] startIdx: " + startIdx );
			myoptions.partialToken = {value: chunk, type:"partial", pos:startIdx, len:chunk.length};
			// // console.log("added partial: " + tokenAsString(myoptions.partialToken));

		// user typed few chars and there are no valid tokens
		} else if (!lastToken) {
			myoptions.partialToken = {value: input, type:"partial", pos:0, len:input.length};
		}
	}

	/** Searches previous token of given type from an index */
	function findPreviousTokenByType(array, startIdx, typeName) {
		for (var i = startIdx; i > -1; i--) {
			var token = array[i] ;
			printToken(token);
			if (token.type == typeName) {
				return token ;
			}
		}
		return null ;
	}

	function getIndexOfToken(token) {
		var idx = myoptions.tokenArray.indexOf(token) ;
		return idx ;
	}

	function isLastToken(token) {
		// there are no tokens !
		if (myoptions.tokenArray.length == 0) {
			return -1 ;
		}

		var tok = myoptions.tokenArray[myoptions.tokenArray.length -1];
		if (tok === token) {
			return 1 ;
		}
		// this is not the last token
		return 0;
	}

//===============================================
//        FIND TOKENS (end)
//===============================================

//===============================================
//        OBTAIN VALUES (start)
//===============================================

	function getAllZqlOps() {
		var ar = new Array();
		ar.push("and");
		ar.push("or");
		ar.push("not");
		return ar ;
	}


	function getAllAttrOps() {
		var ar = new Array();
		ar.push("=");
		ar.push("!=");
		ar.push("~");
		ar.push("!~");
		ar.push("in");
		return ar ;
	}

	function getBooleanValues() {
		var ar = new Array();
		ar.push("true");
		ar.push("false");
		return ar ;
	}

	function getZqlField(name) {
		for (var i= 0; i < myoptions.zqlMeta.length; i++) {
			if (name == myoptions.zqlMeta[i].name) {
				return myoptions.zqlMeta[i] ;
			}
		}
		return null ;
	}

	function getZqlFieldNames(namePrefix) {
		var ar = new Array() ;
		for (var i= 0; i < myoptions.zqlMeta.length; i++) {
			// show only visible fields in auto suggestion
			if (myoptions.zqlMeta[i].visible == true) {
				ar.push(myoptions.zqlMeta[i].name) ;
			}
		}
		// TODO filter
		if (namePrefix && namePrefix.length > 0) {
			return filterValues(ar, namePrefix, true);
		}
		return ar ;
	}

	function filterValues(ar, prefix, ignoreCase) {
		var output = new Array();
		for (var i= 0; i < ar.length; i++) {
			if ( (ignoreCase && ar[i].toString().toLowerCase().substring(0, prefix.length) == prefix.toLowerCase())
				|| (!ignoreCase && ar[i].toString().substring(0, prefix.length) == prefix) ) {
				output.push(ar[i]) ;
			}
		}
		return output ;
	}

//===============================================
//        OBTAIN VALUES (end)
//===============================================

//===============================================
//        MAIN LOGIC (start)
//===============================================

	/** expected is syntaxError.expected. may be null */
	function findUsersCurrentToken(input, syntaxError) {
		var idx = myoptions.userPos;
		// token where user is located
		var userPosToken = null ;

		// token where user is present OR if user's token is partial, the token before it.
		userPosToken = findTokenByPosition(myoptions.tokenArray, myoptions.userPos) ;
		myoptions.lastToken = userPosToken ;

		findPartialToken(myoptions.tokenArray, myoptions.userPos, input);
		var partialToken = myoptions.partialToken ;

		// // console.log("index: " + idx);
		printToken(userPosToken);
		printToken(partialToken);

		if (userPosToken ) {
			// user is within the token
			if (!partialToken) {
				// // console.log("user is within: " + tokenAsString(userPosToken));
				showChoices(syntaxError);

			// user is after the token
			} else {
				// // console.log("user is after: " + tokenAsString(userPosToken));
				showChoices(syntaxError);

			}

		} else {
			// user typed few characters and can't be parsed as token
			if (partialToken) {
				// e.g. user typed few characters of a zql field. e.g. "prio"
				// lets lookup based on these characters
				setUserChoiceResult(getZqlFieldNames(input.substring(0, myoptions.userPos)), null) ;

			// input must be blank
			} else {
				// shows all attribute names
				setUserChoiceResult(getZqlFieldNames(null), null) ;
			}
		}

	}


// attrName
// attrOp = ~ etc
// attrMultiValue (after in clause)
// attrValue can be: boolean/number/decimal/string
// attrMultiValueBracketOpen, comma, attrMultiValueBracketClosed
// bracketOpen, bracketClosed (not being userd, reseved for par expressions )
// ws
// zqlOp : and/or/not

	function showChoices(syntaxError) {
		// user is within this token, lets show the relevant choices
		if (!myoptions.partialToken) {
			var tok = myoptions.lastToken ;
			// replace attribute name
			if (tok.type == "attrName") {

				// tok.value may be partial zqlFieldName.
				setUserChoiceResult(getZqlFieldNames(tok.value), tok.value) ;
				return ;

			// replace attribute operator
			} else if (tok.type == "attrOp") {

				var idx = getIndexOfToken(tok) ;
				var prevToken = findPreviousTokenByType(myoptions.tokenArray, idx, "attrName") ;
				setUserChoiceResult(showChoicesForOperator(prevToken.value), tok.value) ;
				return ;

			} else if (tok.type == "string") {	// lookups are only for string, boolean

				// input.substring(0, myoptions.userPos)
				var chunk = tok.value.substring(0, (myoptions.userPos - tok.pos));
				showLookup(tok, chunk);
				return ;

			} else if (tok.type == "boolean") {	// lookups are only for string, boolean

				var chunk = tok.value.substring(0, (myoptions.userPos - tok.pos));
				showLookup(tok, chunk);
				return ;

			} else if (tok.type == "zqlOp") {

				/* myoptions.userChoices = getAllZqlOps() ; */
				setUserChoiceResult(getAllZqlOps(), null) ;

				return ;

			// user entered valid ZQL so far, wants to enter a zqlOp (and/or/not) next
			} else if (tok.type == "ws" ) {

				// no ws typed yet. show suggestins only if user has typed at least a space
				if (myoptions.userPos == tok.pos) {
					return ;
				}

				if (syntaxError == null) {

					// there are no errors and this is last space, so zqlOps are next
					if (isLastToken(tok) > 0) {
						// ZEPHYR-5417: special case when user has typed only spaces
						if (getIndexOfToken(tok) == 0) {
							// shows all attribute names
							setUserChoiceResult(getZqlFieldNames(null), null) ;

						// show ZQL options.
						} else {
							// // console.log("zql ops expected");
							/* myoptions.userChoices = getAllZqlOps() ; */
							setUserChoiceResult(getAllZqlOps(), null) ;
						}
						return ;
					}

					// get interesting token before space.
					// accordingly show the values.
					showChoicesBasedOnLastInterestingToken(syntaxError, null);

				// syntaxError is present
				// syntaxError fails at first error.
				// extract next token from error message and fine tune it
				// if user missed a token and provided next one. then space should prompt that token.
				// e.g. [creator  *  "abc"] and cursor is at *, then we detect the expected tokens
				//
				} else {
					// // console.log("ws: pos:len " + tok.pos + ":" + tok.len + " offset:" + syntaxError.offset);
					if ( (tok.pos + tok.len) == syntaxError.offset) {
						guessChoicesOnSpaceToken(syntaxError);
					}
				}
			}

		} else {
			// there is a partial token. Take its value into consideration.
			// scan for last interesting token and proceed

			showChoicesBasedOnLastInterestingToken(syntaxError, myoptions.partialToken.value);

		}
	}

	function setUserChoiceResult(choices, lookupValue) {
		myoptions.userChoices = choices ;
			// lookup will happen using userChoices
		if (lookupValue) {
			myoptions.lookupValue = lookupValue ;
		}
	}

	/** ignore ws and grab next interesting token. show inputs based on this.
			// look for non ws token
			// if it is zqlOp, show attrName
			// 			attrOp, then this is value
			//			attrName, then it is attrOp
			//
			//			attrValue, then it could be attrvalue (multi value)
			//						or zqlOp (and/or/not)
	*/
	function showChoicesBasedOnLastInterestingToken(syntaxError, myvalue) {
		// find interesting token
		var lastToken = myoptions.lastToken ;
		var idx = getIndexOfToken(lastToken) ;

		var tok = null ;
		for (var i = idx; i >= 0; i--) {
			var token = myoptions.tokenArray[i] ;
			/*
			if (token.type == "zqlOp" || token.type == "attrOp" || token.type == "attrName" || token.type == "attrValue") {
				tok = token ;
				break ;
			}
			*/
			if (!(token.type == "ws"
//				|| token.type == "attrMultiValueBracketOpen" || token.type == "comma" || token.type == "attrMultiValueBracketClosed" || token.type == "ws"
//				|| token.type == "bracketOpen" || token.type == "bracketClosed"
				)) {
				tok = token ;
				break ;
			}
		}

		printToken(tok);

		if (tok.type == "zqlOp") {	// show attrName
			setUserChoiceResult(getZqlFieldNames(myvalue), myvalue)

		} else if (tok.type == "attrOp") {	// show values by lookup
			showLookup(lastToken, myvalue);

		} else if (tok.type == "attrName") {	// show attrOp
			setUserChoiceResult(showChoicesForOperator(tok.value), tok.value)

		} else if (tok.type == "string" || tok.type == "number" || tok.type == "boolean" || tok.type == "decimal") {
			// this may be one of the values of in-operator
			// 		then show , or )
			// e.g. creator = "test.manager" *   (user is at *)
			//
			// else the operator is not in-operator
			// 		show zqlOp (and/or/not)
			// e.g. creator in ("test.lead", "test.manager") *      (user is at *)

			var prevTok = findPreviousTokenByType(myoptions.tokenArray, idx, "attrOp");
			if (prevTok.value == "in") {

				var ar = new Array();
				ar.push(",");
				ar.push(")");
				setUserChoiceResult(ar, null);

			} else {
				setUserChoiceResult(getAllZqlOps(), null);
			}

			// // console.log("todo");

		} else if (tok.type == "attrMultiValueBracketOpen") {
			// lookup values
			showLookup(tok, myvalue);

		} else if (tok.type == "comma") {
			// lookup values
			showLookup(tok, myvalue);

		} else if (tok.type == "attrMultiValueBracketClosed") {
			// show zql ops
			setUserChoiceResult(getAllZqlOps(), null) ;

		}
		// not implemented yet
		/*
		} else if (tok.type == "bracketOpen") {
			// show all field names
			setUserChoiceResult(getZqlFieldNames(null), null) ;

		} else if (tok.type == "bracketClosed") {
			// show zql ops
			setUserChoiceResult(getAllZqlOps(), null) ;
		}
		*/
	}

	/** if attrname is invalid, show all operators */
	function showChoicesForOperator(attrName) {
		var fieldMeta = getZqlField(attrName);
		if (fieldMeta) {
		   return fieldMeta.operators ;
		} else {
		   return getAllAttrOps() ;
		}
	}

	/** Guess from the expected choices what is next
		Sample values in syntaxError.exptected
		// [Object { type="literal", value=" ", description="" ""}, Object { type="literal", value="(", description=""(""},
		//	Object { type="literal", value=""", description=""\"""}, Object { type="literal", value="false", description=""false""},
		//	Object { type="literal", value="true", description=""true""}, Object { type="class", value="[0-9]", description="[0-9]"}]
	*/
	function guessChoicesOnSpaceToken(syntaxError) {
		// prepare a consolidated list of operators
		var ar = extractExpectedValues(syntaxError);

		// show the filtered list of operators.
		if (ar.indexOf(" ") > -1 		// space
			&& ar.indexOf("!=") > -1 	// operators
			&& ar.indexOf("=") > -1
			&& ar.indexOf("~") > -1
			&& ar.indexOf("!~") > -1
			&& ar.indexOf("in") > -1) {

			var idx = myoptions.tokenArray.indexOf(myoptions.lastToken) ;
			// get token before that and compute precise list of operators
			// // console.log("looks like operators are expected. idx: " + idx) ;
			var tok = myoptions.tokenArray[idx-1] ;
			if (tok.type == "attrName") {
				myoptions.userChoices = showChoicesForOperator(tok.value);
				return ;
			}

		/** If expected are below, parse expects attrValue */
		} else if (ar.indexOf(" ") > -1 	// space
			&& ar.indexOf("(") > -1			// (
			&& ar.indexOf('"') > -1			// start of string
			&& ar.indexOf("false") > -1		// boolean value
			&& ar.indexOf("[0-9]") > -1 ) {	// number

			// if type is number/decimal -> metadata ensures there is no lookup
			// for boolean - we know the values
			// for string, there is server side lookup
			showLookup(myoptions.lastToken, "");

		/** If expected are below, parse expects attrValue.
			This is one of the values inside in-clause
			compared to previous else-if, this doesn't have "(" */
		} else if (ar.indexOf(" ") > -1 	// space
			&& ar.indexOf('"') > -1			// start of string
			&& ar.indexOf("false") > -1		// boolean value
			&& ar.indexOf("[0-9]") > -1 ) {	// number

			// if type is number/decimal -> metadata ensures there is no lookup
			// for boolean - we know the values
			// for string, there is server side lookup
			showLookup(myoptions.lastToken, "");


		/** inside multi value text */
		} else if (ar.indexOf(",") > -1 	// space
			&& ar.indexOf(')') > -1	) {		// start of string

			var ar = new Array();
			ar.push(",");
			ar.push(")");
			setUserChoiceResult(ar, null);

		// below code may not be used.
		} else if (ar.indexOf(" ") > -1 	// space
			&& ar.indexOf("and") > -1		// and/or/not
			&& ar.indexOf("not") > -1
			&& ar.indexOf("or") > -1
			&& ar.indexOf("end") > -1 ) {

			// // console.log("zql ops expected");
			myoptions.userChoices = getAllZqlOps() ;

		// not used ??
		} else if (ar.indexOf("[a-zA-Z]") > -1 	&& ar.length == 1) {
			// todo ? lookup
			// // console.log("todo: " + syntaxError.exptected);

		/*  Expected " ", "(" or [a-z] but end of input found.
			attribute name is expected */
		} else if (ar.indexOf(" ") > -1
			&& ar.indexOf("(") > -1
			&& ar.indexOf("[a-zA-Z]") > -1	) {
			// // console.log("attribute name expected: " + syntaxError.exptected);
			myoptions.userChoices = getZqlFieldNames(null);	// shows all attribute names

		/*	User is using brackets. Expecting attribute name after (.
			e.g. creator = "test.lead" and ( * )      (user is at *)     */
		} else if (ar.indexOf(" ") > -1
			&& ar.indexOf("[a-zA-Z]") > -1	) {
			// // console.log("attribute name expected: " + syntaxError.exptected);
			myoptions.userChoices = getZqlFieldNames(null);	// shows all attribute names

		} else {
			// its a mystery
			// // console.log("todo: " + syntaxError.exptected);
		}
	}

	/** show choices for lookup, based on given value.
	    lookupToken is the token of which chunk is a part.  */
	function showLookup(token, chunk) {
		var idx = myoptions.tokenArray.indexOf(token) ;
		var prevToken = findPreviousTokenByType(myoptions.tokenArray, idx, "attrName") ;
		// lookup zqlField by its name
		var fieldMeta = getZqlField(prevToken.value);	// token.value is the zqlField name
		// e.g. dataType:"string", entityName:"testcase", lookup:"server", 	lookupKey:"ZQL_TESTCASE_CREATOR", name: "creator", operators: 	["=", "in", "!="]
		if (fieldMeta && fieldMeta.lookup == "server") {
			// to smartly replace values, providing entire token
			if (token.type == "string" || token.type == "boolean") {
				myoptions.lookupToken = token ;
			}

			if (fieldMeta.dataType == "boolean") {
				setUserChoiceResult(getBooleanValues(), null)
				//myoptions.userChoices = ar ;
				return ;
			}

			myoptions.lookupField = fieldMeta ;
			// myoptions.lookupValue = chunk.substring(1) ;	// remove leading "
			setUserChoiceResult(null, chunk);
			//myoptions.lookupValue = chunk ;	// value starts with "
		}


	}


	/** extracts values from syntaxError.expected.
	 * e.g. Object { type="literal", value=" ", description="" ""}, Object { type="literal", value="!=", description=""!=""},
	 */
	function extractExpectedValues(syntaxError) {
		var expectedValues = new Array();
		for (var i = 0; i < syntaxError.expected.length; i++) {
			expectedValues.push(syntaxError.expected[i].value);
		}
		return expectedValues ;
	}

//===============================================
//        MAIN LOGIC (end)
//===============================================


//===============================================
//        RETURN (start)
//===============================================

	return {
		ParseResponse: ParseResponse,
		doParse:       doParse
	};

//===============================================
//        RETURN (end)
//===============================================

})();

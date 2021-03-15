module.exports = function check(str, bracketsConfig) {
    let openingBrackets = bracketsConfig( (b) => b[0]);
    let closingBrackets = bracketsConfig( (b) => b[1]);
    let stack = [];

    for (let currentChar of str)
    {
        let isOpeningBracket = openingBrackets.includes(currentChar)
        let isClosingBracket = closingBrackets.includes(currentChar)
        let isCorrespondingClosingBracket = isOpeningBracket && isClosingBracket
        let notABracket = !isOpeningBracket && !isClosingBracket

        if(notABracket) continue;
        else if(isOpeningBracket){
            if (isCorrespondingClosingBracket){
                let previousBracket = stack.pop()

                if (previousBracket !== undefined){
                    if (currentChar !== previousBracket){
                        stack.push(previousBracket)
                        stack.push(currentChar)
                    }
                } else {
                        stack.push(currentChar)
                }
            } else {
                let correspondingClosingBracket = closingBrackets[openingBrackets.indexOf(currentChar)]
                stack.push(correspondingClosingBracket)
            }
        } else if (isClosingBracket){
            let expectedClosingBracket = stack.pop()
            if (currentChar !== expectedClosingBracket) return false;
        }
    }
    return stack.length === 0;
}
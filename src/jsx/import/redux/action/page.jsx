/**
 * page.jsx: send current support vector 'submit button' boolean, indication
 *           whether it should be displayed to the redux store.
 *
 */

function setSvButton(action) {
    return {
        type: 'SUBMIT-SV-ANALYSIS',
        button: {
            submit_analysis: action.button.submit_analysis
        }
    };
}

function setGotoResultsButton(action) {
    return {
        type: 'GOTO-RESULTS',
        button: {
            goto_results: action.button.goto_results
        }
    };
}

function setLayout(action) {
    return {
        type: 'SET-LAYOUT',
        layout: action.layout
    };
}

function setContentType(action) {
    return {
        type: 'SET-CONTENT-TYPE',
        content_type: action
    };
}

// indicate which class can be exported, and instantiated via 'require'
export { setSvButton, setGotoResultsButton, setLayout, setContentType }

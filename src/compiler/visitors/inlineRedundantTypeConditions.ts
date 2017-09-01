import { CompilerContext, SelectionSet, Selection } from '../';

export function inlineRedundantTypeConditions(context: CompilerContext, selectionSet: SelectionSet): SelectionSet {
  const selections: Selection[] = [];

  for (const selection of selectionSet.selections) {
    if (
      selection.kind === 'TypeCondition' &&
      selectionSet.possibleTypes.every(type => selection.selectionSet.possibleTypes.includes(type))
    ) {
      selections.push(...inlineRedundantTypeConditions(context, selection.selectionSet).selections);
    } else {
      selections.push(selection);
    }
  }

  return {
    possibleTypes: selectionSet.possibleTypes,
    selections
  };
}

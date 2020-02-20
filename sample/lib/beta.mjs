/**
 * @fileoverview The beta module.
 * @module {EsModule} sample/lib/beta
 */

/**
 * @param {number} operand
 * @return {Promise<number>}
 */
async function addself(operand) {
  return operand + operand;
}

export default { addself };

function collectTests(task, output = []) {
  if (task.type === 'test') {
    output.push(task);
    return output;
  }

  for (const child of task.tasks ?? []) {
    collectTests(child, output);
  }

  return output;
}

function statusMark(state) {
  if (state === 'pass') return '[x]';
  if (state === 'skip' || state === 'todo') return '[ ]';
  return '[!]';
}

export default class ChecklistReporter {
  onFinished(files = [], errors = []) {
    const allTests = files.flatMap((file) => collectTests(file));
    const passed = allTests.filter((test) => test.result?.state === 'pass').length;
    const skipped = allTests.filter((test) =>
      ['skip', 'todo'].includes(test.result?.state),
    ).length;
    const failed = allTests.length - passed - skipped;

    const lines = [
      '',
      'TEST RUN CHECKLIST',
      '==================',
    ];

    for (const file of files) {
      const tests = collectTests(file);
      if (tests.length === 0) continue;

      lines.push('', file.name);

      for (const test of tests) {
        lines.push(`  ${statusMark(test.result?.state)} ${test.name}`);
      }
    }

    lines.push(
      '',
      'FINAL SUMMARY',
      '-------------',
      `[x] Passed:  ${passed}`,
      `[!] Failed:  ${failed}`,
      `[ ] Skipped: ${skipped}`,
      `Total:      ${allTests.length}`,
    );

    if (errors.length > 0) {
      lines.push('', 'RUNNER ERRORS');
      for (const error of errors) {
        lines.push(`[!] ${error?.message ?? String(error)}`);
      }
    }

    console.log(lines.join('\n'));
  }
}

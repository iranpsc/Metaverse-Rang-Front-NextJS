function collectTests(task, output = []) {
  if (task.type === 'test') {
    output.push(task);
    return output;
  }

  for (const child of task.children ?? []) {
    collectTests(child, output);
  }

  return output;
}

function getState(test) {
  const state = test.result()?.state;

  if (state === 'passed' || state === 'pass') return 'passed';
  if (state === 'skipped' || state === 'skip' || state === 'todo') return 'skipped';
  if (state === 'failed' || state === 'fail') return 'failed';

  return 'failed';
}

function statusMark(state) {
  if (state === 'passed') return '[x]';
  if (state === 'skipped') return '[ ]';
  return '[!]';
}

export default class ChecklistReporter {
  onTestRunEnd(testModules = [], unhandledErrors = [], reason) {
    const files = testModules.map((module) => ({
      name: module.moduleId ?? module.name ?? 'Unknown test file',
      tests: collectTests(module),
    }));

    const allTests = files.flatMap((file) => file.tests);
    const passed = allTests.filter((test) => getState(test) === 'passed').length;
    const skipped = allTests.filter((test) => getState(test) === 'skipped').length;
    const failed = allTests.length - passed - skipped;

    const lines = [
      '',
      'TEST RUN CHECKLIST',
      '==================',
    ];

    for (const file of files) {
      if (file.tests.length === 0) continue;

      lines.push('', file.name);

      for (const test of file.tests) {
        const state = getState(test);
        lines.push(`  ${statusMark(state)} ${test.name}`);
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

    if (unhandledErrors.length > 0) {
      lines.push('', 'RUNNER ERRORS');
      for (const error of unhandledErrors) {
        lines.push(`[!] ${error?.message ?? String(error)}`);
      }
    }

    if (reason && reason !== 'passed') {
      lines.push('', `Run status: ${reason}`);
    }

    process.stdout.write(`${lines.join('\n')}\n`);
  }
}

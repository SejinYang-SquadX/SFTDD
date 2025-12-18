import { test, describe } from 'vitest';

interface TestMetadata<T> {
    feature: string;    // 기능 단위
    title: string;      // 테스트 이름
    purpose: string;    // 테스트 목적
    params: any;        // 파라미터 값 (Input)
    expected: any;      // 결과 예상 (Output)
}

export const runTest = <T>(
    meta: TestMetadata<T>,
    testFn: () => Promise<T> | T
) => {
    // Vitest UI 사이드바에 계층 구조 생성
    const paramSummary = JSON.stringify(meta.params).substring(0, 50);

    describe(`📘 ${meta.feature}`, () => {
        describe(`🎯 ${meta.purpose}`, () => {
            test(`🧪 ${meta.title}`, async () => {
                console.log('\n===================================================');
                console.log(`📘 Feature : ${meta.feature}`);
                console.log(`🎯 Purpose : ${meta.purpose}`);
                console.log(`🧪 Test    : ${meta.title}`);
                console.log('---------------------------------------------------');
                console.log(`📥 Params  : ${JSON.stringify(meta.params, null, 2)}`);
                console.log(`📤 Expected: ${JSON.stringify(meta.expected, null, 2)}`);

                try {
                    const actual = await testFn();
                    console.log(`✅ Actual  : ${JSON.stringify(actual, null, 2)}`);
                    console.log('===================================================\n');
                } catch (error) {
                    console.log(`❌ Actual  : FAILED (${error})`);
                    console.log('===================================================\n');
                    throw error;
                }
            });
        });
    });
};

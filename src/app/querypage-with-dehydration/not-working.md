nextjs app router에서 ssr과 react query를 함께 사용하는게 안되네.

react query 공식문서 https://tanstack.com/query/latest/docs/framework/react/examples/nextjs-app-prefetching 를 참조하여
진행해 보았다.

ssr자체는 정상적으로 실행 되었으나

문제는 mutation이후에, dehydration한 cache data인 todo-dehydration(server fetch)에 대한 데이터 최신화가 안된다.

useMutation 내부에서 invalidateQueries, refetchQueries와
next의 router.refresh()까지도 todo-dehydration의 최신화는 안됨.

`querypage-with-dehydration/page.tsx`에서 `prefetch`한 `todo-dehydration`을 `todo-add-section-dehydration`에서 `useQuery`로 todo-dehydration queryKey와 이전의 queryFn을
다시 사용하여 cache 최신화를 해보려했지만

아래와 같은 에러가 뜬다
Error: Only plain objects, and a few built-ins, can be passed to Server Actions. Classes or null prototypes are not supported.

next query는 client component에서만 쓰자

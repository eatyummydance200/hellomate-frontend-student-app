import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar } from '@/src/components/Avatar';
import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { Input } from '@/src/components/Input';
import { Text } from '@/src/components/Text';
import { BottomNav } from '@/src/components/layout/BottomNav';
import { Header } from '@/src/components/layout/Header';

const TEXT_SIZES = ['micro', 'captionSm', 'caption', 'label', 'body', 'title', 'display'] as const;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="gap-12 border-b border-border-strong/20 px-16 py-20">
      <Text size="title" weight="bold">
        {title}
      </Text>
      {children}
    </View>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View className="gap-8">
      <Text size="caption" color="muted">
        {label}
      </Text>
      {children}
    </View>
  );
}

export function ComponentGalleryScreen() {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="pb-40">
      <Section title="Text">
        {TEXT_SIZES.map((size) => (
          <Text key={size} size={size}>
            {size} — 안녕하세요
          </Text>
        ))}
      </Section>

      <Section title="Button">
        <Row label="primary">
          <Button label="다음" variant="primary" />
        </Row>
        <Row label="primary disabled">
          <Button label="다음" variant="primary" disabled />
        </Row>
        <Row label="secondary">
          <Button label="이전" variant="secondary" />
        </Row>
        <Row label="secondary disabled">
          <Button label="이전" variant="secondary" disabled />
        </Row>
      </Section>

      <Section title="Input">
        <Row label="기본">
          <Input placeholder="클럽 이름을 입력하세요" />
        </Row>
        <Row label="label + required">
          <Input label="아이디" required placeholder="아이디를 입력하세요" />
        </Row>
        <Row label="error">
          <Input
            label="비밀번호"
            required
            placeholder="비밀번호를 입력하세요"
            error="비밀번호가 올바르지 않습니다"
          />
        </Row>
      </Section>

      <Section title="Card">
        <Row label="radius lg">
          <Card radius="lg">
            <Text>카드 내용 (lg)</Text>
          </Card>
        </Row>
        <Row label="radius xl">
          <Card radius="xl">
            <Text>카드 내용 (xl)</Text>
          </Card>
        </Row>
      </Section>

      <Section title="Avatar">
        <View className="flex-row gap-16">
          <Row label="sm">
            <Avatar size="sm" />
          </Row>
          <Row label="lg">
            <Avatar size="lg" />
          </Row>
        </View>
      </Section>

      <Section title="Header">
        <Header />
      </Section>

      <Section title="BottomNav">
        <BottomNav />
      </Section>
    </ScrollView>
  );
}
